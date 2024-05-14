const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const licensorSchema = new Schema({
    companyName: { type: String },
    companyEmail: { type: String },
    companyLogo: { type: String},
    licenserName: { type: String },
    licenserEmail: { type: String },
    licenserPhno : { type: String },
    bankAccNum : { type: String },
    ifsc_iban : { type: String },
    currency: { type: String },
    channel: {
        type:[]
    },
    music: {
        type:[] 
    }
});

const licensors = mongoose.model('licensors', licensorSchema);

module.exports = licensors;





