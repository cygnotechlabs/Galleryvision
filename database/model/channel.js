const mongoose = require("mongoose");

const channelSchema = mongoose.Schema({
  channelId: { type: String, required: true, unique: true },
  channelName: { type: String, required: true, unique: true },
  commission: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  currency: { type: String, required: true },
  logo: { type: String, required: true }
});

const channels = mongoose.model('channels', channelSchema)

module.exports = channels


