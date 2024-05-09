const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const licensorSchema = new Schema({
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true },
    companylogo: { type: String, required: true},
    licenserName: { type: String, required: true , unique: true},
    licenserEmail: { type: String, required: true },
    licenserAddress : { type: String, required: true },
    licenserPhno : { type: String, required: true },
    paymentMethod : { type: String, required: true },
    bankAccNum : { type: String, required: true },
    ifsc_iban : { type: String, required: true },
    preferredCurrency: { type: String, required: true }
    // channel: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Channel' 
    // },
    // music: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Music' 
    // }
});

const licensors = mongoose.model('licensors', licensorSchema);

module.exports = licensors;





