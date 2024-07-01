// const channelInvoiceModel = require('../database/model/channelInvoice');
// const musicInvoiceModel = require('../database/model/musicInvoice');
// const csv = require('csvtojson');

// const importReport = async (req, res) => {
//     try {
//         console.log("Starting Report extracting process...");

//         let userData = [];
//         try {
//             // Read and parse the CSV file
//             const response = await csv({
//                 delimiter: ',', 
//                 noheader: false,
//                 headers: [
//                     'File_Sequence_Num',
//                     'Pymt_Prod_Type_Code',
//                     'Pymt_Mode',
//                     'Debit_Acct_no',
//                     'Beneficiary Name',
//                     'Beneficiary Account No',
//                     'Bene_IFSC_Code',
//                     'Amount',
//                     'Debit narration',
//                     'Credit narration',
//                     'Mobile Number',
//                     'Email id',
//                     'Remark',
//                     'Pymt_Date',
//                     'Reference_no',
//                     'Addl_Info1',
//                     'Addl_Info2',
//                     'Addl_Info3',
//                     'Addl_Info4',
//                     'Addl_Info5',
//                     'Beneficiary LEI',
//                     'STATUS',
//                     'Current Step',
//                     'File name',
//                     'Rejected by',
//                     'Rejection Reason',
//                     'Acct_Debit_date',
//                     'Customer Ref No',
//                     'UTR NO '
//                 ]
//             }).fromFile(req.file.path);
//             console.log("Report CSV parsed successfully.");

//             // Extract account numbers and amounts
//             for (const record of response) {
//                 const debitAccNo = record['Beneficiary Account No'];
//                 const amount = record['Amount'];
//                 const status = record['STATUS'];
//                 if (debitAccNo && !isNaN(amount)) {
//                     userData.push({ accNum: debitAccNo, amount });
//                 }
//             }
//             console.log("Report Data Extracted");

//             // Fetch invoices once to minimize database calls
//             const channelInvoices = await channelInvoiceModel.find();
//             const musicInvoices = await musicInvoiceModel.find();

//             for (const user of userData) {
//                 const { accNum, amount } = user;

//                 // Update channel invoices
                
//                 const matchingChannelInvoice = channelInvoices.find(invoice => 
//                     invoice.accNum === accNum && invoice.payout === amount);
                
//                 if (matchingChannelInvoice && matchingChannelInvoice.status !== 'Paid') {
//                     matchingChannelInvoice.status = 'Paid';
//                     await matchingChannelInvoice.save();
//                     console.log(`Updated channel invoice for account ${accNum} and amount ${amount} to Paid.`);
//                 }

//                 // Update music invoices
//                 const matchingMusicInvoice = musicInvoices.find(invoice => 
//                     invoice.accNum === accNum && invoice.payout === amount);
                

//                 if (matchingMusicInvoice && matchingMusicInvoice.status !== 'Paid') {
//                     matchingMusicInvoice.status = 'Paid';
//                     await matchingMusicInvoice.save();
//                     console.log(`Updated music invoice for account ${accNum} and amount ${amount} to Paid.`);
//                 }
//             }

//             res.status(200).send({ success: true, msg: "Invoices updated successfully" });
//             console.log("Report Extrated Successfully");

//         } catch (error) {
//             console.error("Error parsing CSV:", error);
//             res.status(400).send({ success: false, msg: "Error parsing CSV" });
//         }
//     } catch (error) {
//         console.error("Error during importReport process:", error);
//         res.status(500).send({ success: false, msg: error.message });
//     }
// }

// module.exports = {
//     importReport
// };







const channelInvoiceModel = require('../database/model/channelInvoice');
const musicInvoiceModel = require('../database/model/musicInvoice');
const csv = require('csvtojson');

const importReport = async (req, res) => {
    try {
        console.log("Starting Report extracting process...");

        let userData = [];
        try {
            // Read and parse the CSV file
            const response = await csv({
                delimiter: ',', 
                noheader: false,
                headers: [
                    'File_Sequence_Num',
                    'Pymt_Prod_Type_Code',
                    'Pymt_Mode',
                    'Debit_Acct_no',
                    'Beneficiary Name',
                    'Beneficiary Account No',
                    'Bene_IFSC_Code',
                    'Amount',
                    'Debit narration',
                    'Credit narration',
                    'Mobile Number',
                    'Email id',
                    'Remark',
                    'Pymt_Date',
                    'Reference_no',
                    'Addl_Info1',
                    'Addl_Info2',
                    'Addl_Info3',
                    'Addl_Info4',
                    'Addl_Info5',
                    'Beneficiary LEI',
                    'STATUS',
                    'Current Step',
                    'File name',
                    'Rejected by',
                    'Rejection Reason',
                    'Acct_Debit_date',
                    'Customer Ref No',
                    'UTR NO '
                ]
            }).fromFile(req.file.path);
            console.log("Report CSV parsed successfully.");

            // Extract account numbers and amounts
            for (const record of response) {
                const debitAccNo = record['Beneficiary Account No'];
                const amount = record['Amount'];
                const status = record['STATUS'];

                // Only consider records where the status is 'Success' and amount is a number
                if (debitAccNo && !isNaN(amount) && status === 'Success') {
                    userData.push({ accNum: debitAccNo, amount });
                }
            }
            console.log("Report Data Extracted");

            // Fetch invoices once to minimize database calls
            const channelInvoices = await channelInvoiceModel.find();
            const musicInvoices = await musicInvoiceModel.find();

            for (const user of userData) {
                const { accNum, amount } = user;

                // Update channel invoices
                const matchingChannelInvoice = channelInvoices.find(invoice => 
                    invoice.accNum === accNum && invoice.payout === amount);
                
                if (matchingChannelInvoice && matchingChannelInvoice.status !== 'Paid') {
                    matchingChannelInvoice.status = 'Paid';
                    await matchingChannelInvoice.save();
                    console.log(`Updated channel invoice for account ${accNum} and amount ${amount} to Paid.`);
                }

                // Update music invoices
                const matchingMusicInvoice = musicInvoices.find(invoice => 
                    invoice.accNum === accNum && invoice.payout === amount);
                
                if (matchingMusicInvoice && matchingMusicInvoice.status !== 'Paid') {
                    matchingMusicInvoice.status = 'Paid';
                    await matchingMusicInvoice.save();
                    console.log(`Updated music invoice for account ${accNum} and amount ${amount} to Paid.`);
                }
            }

            res.status(200).send({ success: true, msg: "Invoices updated successfully" });
            console.log("Report Extracted Successfully");

        } catch (error) {
            console.error("Error parsing CSV:", error);
            res.status(400).send({ success: false, msg: "Error parsing CSV" });
        }
    } catch (error) {
        console.error("Error during importReport process:", error);
        res.status(500).send({ success: false, msg: error.message });
    }
}

module.exports = {
    importReport
};





