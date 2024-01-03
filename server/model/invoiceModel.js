const mongoose =require("mongoose");

const invoiceSchema = new mongoose.Schema({
    ownerEmail:{
        type: String,
        required: true,
        unique:true
    },
    recipientEmail:{
        type: String,
        required: true,
        
    },
    amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    dueDate:{
        type:Date,
        required:true
    }

})

module.exports = mongoose.model("Invoice", invoiceSchema);
