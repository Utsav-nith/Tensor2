const Invoice = require("../model/invoiceModel.js");
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');


const create = async (req, res) => {
  // console.log(req.body);
  try {
    const invoiceData = new Invoice(req.body);

    await invoiceData.save();
    res.status(200).json({ msg: "Invoice created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  // console.log(req.body, res.body);
  try {
    const invoiceData = await Invoice.find();
    if (!invoiceData) {
      return res.status(404).json({ msg: "Invoice data not found" });
    }
    res.status(200).json(invoiceData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const invoiceExist = await Invoice.findById(id);
    if (!invoiceExist) {
      return res.status(404).json({ msg: "Invoice not found" });
    }
    res.status(200).json(invoiceExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const invoiceExist = await Invoice.findById(id);
    if (!invoiceExist) {
      return res.status(401).json({ msg: "Invoice not found" });
    }

    const updatedData = await Invoice.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: "Invoice updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const id = req.params.id;
    const invoiceExist = await Invoice.findById(id);
    if (!invoiceExist) {
      return res.status(404).json({ msg: "Invoice not exist" });
    }
    await Invoice.findByIdAndDelete(id);
    res.status(200).json({ msg: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const generateInvoice = async (req, res) => {
  try {
    const id = req.params.id;
    const invoice = await Invoice.findById(id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
}

const sendEmail = (req, res) => {

  const { userEmail } = req.body;
  console.log(req.body);
  let config = {
      service : 'gmail',
      auth : {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }
  }

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
      theme: "default",
      product : {
          name: "Mailgen",
          link : 'https://mailgen.js/'
      }
  })

  let response = {
      body: {
          name : "Hi From TensorGo",
          intro: "Your bill has arrived!",
          outro: "Looking forward to do more business"
      }
  }

  let mail = MailGenerator.generate(response)

  let message = {
      from : process.env.EMAIL,
      to : userEmail,
      subject: "Reminder for pending amount",
      html: mail
  }

  transporter.sendMail(message).then(() => {
      return res.status(201).json({
          msg: "you should receive an email"
      })
  }).catch(error => {
      return res.status(500).json({ error })
  })

  // res.status(201).json("getBill Successfully...!");
}
module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteInvoice,
  generateInvoice,
  sendEmail,
};