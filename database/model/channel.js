const mongoose = require("mongoose");

const channelSchema = mongoose.Schema({
  channelId: { type: String },
  channelName: { type: String},
  commission: { type: String},
  channelEmail: { type: String },
  licensorId: { type: String},
  channelLogo: { type: String}
  // assets:{
  //   type:[]
  // }
});

const channels = mongoose.model('channels', channelSchema)

module.exports = channels


// , required: true, unique: true