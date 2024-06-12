const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const channelSchema = new Schema({
    channelId: {
      type: String
    },
    channelName: {
      type: String
    }
  }, { _id: false });

  const musicSchema = new Schema({
    musicId: {
      type: String
    },
    musicName: {
      type: String
    }
  }, { _id: false });

const licensorSchema = new Schema({
    companyName: { type: String },
    companyEmail: { type: String },
    companyLogo: { type: String},
    licensorName: { type: String },
    licensorEmail: { type: String },
    licensorPhno : { type: String },
    licensorAddress : { type: String },
    bankAccNum : { type: String },
    ifsc_iban : { type: String },
    currency: { type: String },
    panNumber: { type: String },
    tds: { type: String },
    channel:[channelSchema],
    music: [musicSchema]
});

const licensors = mongoose.model('licensors', licensorSchema);

module.exports = licensors;





