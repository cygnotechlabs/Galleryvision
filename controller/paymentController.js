const { ObjectId } = require('mongodb')
const channelInvoices = require("../database/model/channelInvoice");
const musicInvoices = require("../database/model/musicInvoice");

exports.ChannelInvoiceStatus = async (req, res) => {
    try {
        const id = req.params.id; // Assuming "id" is the parameter name for the invoice ID
        const { status } = req.body; // Extract the desired status from the request body

        // Validate the status
        // if (!['paid', 'unpaid'].includes(status)) {
        //     return res.status(400).json({ success: false, message: 'Invalid status value' });
        // }

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
        const id = req.params.id; // Assuming "id" is the parameter name for the invoice ID
        const { status } = req.body; // Extract the desired status from the request body
        console.log("payment status : ",req.body);
        const objectId = new ObjectId(id);
        const filter = { _id: objectId };
        const update = { $set: { status: status } }; // Set the status to the desired value

        // Update the status of the invoice
        const result = await musicInvoices.updateOne(filter, update);
        return res.status(200).json({ success: true, message: `Invoice status updated to ${status}` });

    } catch (error) {
        console.error('Error updating invoice status:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getPayments = async (req, res) => {
  try {
    const channelInvoice = await channelInvoices.find();
    const musicInvoice = await musicInvoices.find();

    // Combine both sets of invoices
    const allInvoices = [...channelInvoice, ...musicInvoice];

    // Separate invoices by currency
    const inrPayments = allInvoices.filter(invoice => invoice.currency === 'INR');
    const usdPayments = allInvoices.filter(invoice => invoice.currency === 'USD'|| invoice.currency === 'INR0');

    if (inrPayments.length > 0 || usdPayments.length > 0) {
      res.status(200).json({
        inrPayments,
        usdPayments,
      });
    } else {
      res.status(404).json("No invoices found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

