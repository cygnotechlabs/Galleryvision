//music_raw Schema
const mongoose = require('mongoose');

const musicRawSchema = new mongoose.Schema({
    musicId: {type : String},
    date: {type : String},
    musicName: {type : String},
    partnerRevenue: {type : String}
});

const rawmusics = mongoose.model('rawmusics', musicRawSchema);

module.exports = rawmusics;
