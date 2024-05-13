const mongoose = require("mongoose");

const channelSchema = mongoose.Schema({
  channelId: { type: String },
  channelName: { type: String},
  commission: { type: String},
  email: { type: String },
  licensorName: { type: String},
  logo: { type: String}
});

const channels = mongoose.model('channels', channelSchema)

module.exports = channels


// , required: true, unique: true