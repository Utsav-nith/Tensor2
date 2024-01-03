const express = require("express");
const {
  create,
  getAll,
  getOne,
  update,
  deleteInvoice,
  generateInvoice,
  sendEmail,
} = require("../controller/invoiceController.js");

const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteInvoice);
route.get("/generateInvoice/:id", generateInvoice);
route.post('/send-email',sendEmail);

module.exports = route;