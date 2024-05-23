// const mongoose = require('mongoose')

// const dateSchema = new mongoose.Schema({
//     month: {
//       type: String
//     },
//     year: {
//       type: String
//     },
//     currencyRate: {
//       type: String
//     }
// }, { _id: false });

// const currencySchema = mongoose.Schema({
//     currencyName: {
//         type: String
//       },
//       date:[dateSchema]
// });

// const currency = mongoose.model('currency',currencySchema)

// module.exports = currency



const mongoose = require('mongoose')



const currencySchema = mongoose.Schema({
    date: {type: String},
    USD: {type: String},
    INR:{type: String}
});

const currency = mongoose.model('currency',currencySchema)

module.exports = currency