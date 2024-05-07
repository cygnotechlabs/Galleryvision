const mongoose = require('mongoose')

const currencySchema = mongoose.Schema({
    currencyName: {
        type: String,
        unique: true,
        required: true
      },
      currencyRate: {
        type: Number,
        required: true
      }
})

const currency = mongoose.model('currency',currencySchema)

module.exports = currency