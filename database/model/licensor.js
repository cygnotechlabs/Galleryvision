const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const channelSchema = new Schema({
    channelId: {
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
    channel:[channelSchema],
    music: []
});

const licensors = mongoose.model('licensors', licensorSchema);

module.exports = licensors;





