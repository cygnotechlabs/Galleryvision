const mongoose = require("mongoose");

const musicInvoicesSchema = mongoose.Schema({
  partnerName: { type: String},
  licensorId: { type: String},
  licensorName: { type: String},

  accNum: { type: String},
  ifsc: { type: String},
  iban: { type: String},
  currency: { type: String},
  
  date: { type: String},
  musicId: { type: String},
  musicName: { type: String},
  invoiceNumber: { type: String},
  ptRevenue: { type: String },
  tax: { type: String},
  ptAfterTax: { type: String },
  commission: { type: String },
  commisionAmount: { type: String },
  totalPayout: { type: String },
  conversionRate: { type: String },
  payout: { type: String },
  status: { type: String }

});

const musicInvoices = mongoose.model("musicInvoices", musicInvoicesSchema);

module.exports = musicInvoices;

