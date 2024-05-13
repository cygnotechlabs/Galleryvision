const mongoose = require('mongoose');

const musicRawSchema = new mongoose.Schema({
    licenserId: {type : String},
    licenserEmail: {type : String},
    commision: {type : String},
    ytRevenue: {type : String},
    partnerRevenue: {type : String}
});

const rawmusics = mongoose.model('rawmusics', musicRawSchema);

module.exports = rawmusics;
