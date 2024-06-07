const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
    date: {
      type: String
    },
    partnerRevenue: {
      type: String
    }
  }, { _id: false });

const musicSchema = new mongoose.Schema({
    musicId: { type: String },
    licensorId: { type: String },
    licensorName: { type: String },
    musicName: { type: String },
    musicEmail: { type: String },
    commission: { type: String },
    musicLogo: { type: String },
    assets: [assetSchema]
});


const musics = mongoose.model('musics', musicSchema);

module.exports = musics;

