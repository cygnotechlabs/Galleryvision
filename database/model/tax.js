const mongoose = require('mongoose')

const taxSchema = mongoose.Schema({
    
      taxPercentage: {
        type: String
      },
      date:{
        type:String
      }
})

const tax = mongoose.model('tax',taxSchema)

module.exports = tax