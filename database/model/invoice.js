const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
  licenserId: { type: String, required: true},
  channelId: { type: String, required: true},
  musicId: { type: String, required: true },
  invoiceDate: { type: String, required: true},
  revenue: { type: String, required: true },
  status: { type: String, required: true },
});

const invoices = mongoose.model("invoices", invoiceSchema);

module.exports = invoices;
