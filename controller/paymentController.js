const { ObjectId } = require('mongodb')
const channelInvoices = require("../database/model/channelInvoice");
const musicInvoices = require("../database/model/musicInvoice");

exports.ChannelInvoiceStatus = async (req, res) => {
    try {
        const id = req.params.id; // Assuming "id" is the parameter name for the invoice ID
        const { status } = req.body; // Extract the desired status from the request body

        // Validate the status
        if (!['paid', 'unpaid'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value' });
        }

        const objectId = new ObjectId(id);
        const filter = { _id: objectId };
        const update = { $set: { status: status } }; // Set the status to the desired value

        // Update the status of the invoice
        const result = await channelInvoices.updateOne(filter, update);
        return res.status(200).json({ success: true, message: `Invoice status updated to ${status}` });

        // if (result.modifiedCount === 1) {
        //     return res.status(200).json({ success: true, message: `Invoice status updated to ${status}` });
        // } else {
        //     return res.status(404).json({ success: false, message: 'Invoice not found' });
        // }
    } catch (error) {
        console.error('Error updating invoice status:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


exports.MusicInvoiceStatus = async (req, res) =>{
    try {
        const id = req.params.id; 
        const objectId = new ObjectId(id);

        const filter = { _id: objectId };
        const update = { $set: { status: 'paid' } };
        
        const result = await musicInvoices.updateOne(filter, update);

        if (result.modifiedCount === 1) {
            return res.status(200).json({ success: true, message: 'Invoice status updated to paid' });
        } else {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }
    } catch (error) {
        console.error('Error updating invoice status:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};