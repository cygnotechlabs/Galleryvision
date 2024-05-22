const channelInvoices = require("../database/model/channelInvoice");

exports.viewChannelPayment = async (req, res) =>{
    try {
        const allChannelInvoice = await channelInvoices.find();

        if (allChannelInvoice){
            res.status(200).json(allChannelInvoice);
        }else{
            res.status(404).json("Invoice not found");
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json("Internal server error"); 
    }
};