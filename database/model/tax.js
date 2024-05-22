const mongoose = require('mongoose')

const taxSchema = mongoose.Schema({
    taxName: {
        type: String,
        unique: true,
        required: true
      },
      taxPercentage: {
        type: Number,
        required: true
      }
})

const tax = mongoose.model('tax',taxSchema)

module.exports = tax