const express  = require  ("express");
const mongoose  = require  ("mongoose");
const bodyParser  = require  ("body-parser");
const dotenv = require  ("dotenv");
const cors = require  ("cors");
const route  = require  ("./routes/invoiceRoute.js");
const passport = require("passport");
const User = require("./model/userSchema")
const session = require("express-session");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,DELETE",
  credentials:true
}));
app.use(express.json());

// setup session
app.use(session({
  secret:"ggsjfakjfsdfosfjnqwhnfwoihbs",
  resave:false,
  saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy({
      clientID:process.env.CLIENT_ID,
      clientSecret:process.env.CLIENT_SECRET,
      callbackURL:"/auth/google/callback",
      scope:["profile","email"]
  },
  async(accessToken,refreshToken,profile,done)=>{
      try {
          let user = await User.findOne({googleId:profile.id});

          if(!user){
              user = new User({
                  googleId:profile.id,
                  displayName:profile.displayName,
                  email:profile.emails[0].value,
                  image:profile.photos[0].value
              });

              await user.save();
          }

          return done(null,user)
      } catch (error) {
          return done(error,null)
      }
  }
  )
)

passport.serializeUser((user,done)=>{
  done(null,user);
})

passport.deserializeUser((user,done)=>{
  done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
  successRedirect:"http://localhost:3000/dashboard",
  failureRedirect:"http://localhost:3000/login"
}))

app.get("/login/sucess",async(req,res)=>{

  if(req.user){
      res.status(200).json({message:"user Login",user:req.user})
  }else{
      res.status(400).json({message:"Not Authorized"})
  }
})

app.get("/logout",(req,res,next)=>{
  req.logout(function(err){
      if(err){return next(err)}
      res.redirect("http://localhost:3000/login");
  })
})


const PORT = process.env.PORT || 7000;
const URL = process.env.MONGO_URL;

mongoose.connect(URL).then(()=>{

    console.log("DB connected successfully");

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })

}).catch(error => console.log(error));

// app.get('/',(req,res)=>{
//     res.json("hello = require 8(080");
// })

app.use("/api", route);
