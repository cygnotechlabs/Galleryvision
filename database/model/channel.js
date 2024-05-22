const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  date: {
    type: String
  },
  partnerRevenue: {
    type: String
  }
}, { _id: false });



const channelSchema = mongoose.Schema({
  channelId: { type: String },
  channelName: { type: String},
  commission: { type: String},
  tax: { type: String},
  channelEmail: { type: String },
  licensorId: { type: String},
  licensorName: { type: String},
  channelLogo: { type: String},
  assets: [assetSchema]
});

const channels = mongoose.model('channels', channelSchema)

module.exports = channels


// , required: true, unique: true


// const mongoose = require("mongoose");

// const channelSchema = mongoose.Schema({
//   channelId: { type: String },
//   channelName: { type: String},
//   commission: { type: String},
//   channelEmail: { type: String },
//   licensorId: { type: String},
//   channelLogo: { type: String},
//   assets:{
//     type:[]
//   }
// });

// const channels = mongoose.model('channels', channelSchema)

// module.exports = channels
