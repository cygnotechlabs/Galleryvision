const mongoose = require("mongoose");


const dashboardSchema = new mongoose.Schema({
    date: { type: String },
    totalLicensor: { type: String },
    totalChannel: { type: String },
    totalMusic: { type: String },
    channelCommission: { type: String },
    musicCommission: { type: String },
    musicTaxDeducted: { type: String },
    channelTaxDeducted: { type: String },
    totalCommission: { type: String },
    totalTaxDeducted: { type: String },
});


const dashboard = mongoose.model('dashboard', dashboardSchema);

module.exports = dashboard;
