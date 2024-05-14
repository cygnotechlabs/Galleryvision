const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String}
});

const channels = mongoose.model('channels', channelSchema)

module.exports = channels

