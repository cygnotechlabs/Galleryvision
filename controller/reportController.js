// const channelInvoiceModel = require('../database/model/channelInvoice');
// const musicInvoiceModel = require('../database/model/musicInvoice');
// const csv = require('csvtojson');

// const importReport = async (req, res) => {
//     try {
//         console.log("Starting importReport process...");       
//         let userData = [];
//         const currentDate = new Date();
//         currentDate.setMonth(currentDate.getMonth());
//         const month = currentDate.toLocaleString('en-US', { month: 'long' });
//         const year = currentDate.getFullYear();
//         const formattedDate = `${month} ${year}`;
//         console.log("Formatted date:", formattedDate);

//         try {
//             const response = await csv({
//                 delimiter: ',', 
//                 noheader: false,
//                 headers: [
//                     'PYMT_PROD_TYPE_CODE',
//                     'PYMT_MODE',
//                     'DEBIT_ACC_NO',
//                     'BNF_NAME',
//                     'BENE_ACC_NO',
//                     'BENE_IFSC',
//                     'AMOUNT',
//                     'DEBIT_NARR',
//                     'CREDIT_NARR',
//                     'MOBILE_NUM',
//                     'EMAIL_ID',
//                     'REMARK',
//                     'PYMT_DATE',
//                     'REF_NO',
//                     'ADDL_INFO1',
//                     'ADDL_INFO2',
//                     'ADDL_INFO3',
//                     'ADDL_INFO4',
//                     'ADDL_INFO5' 
//                 ]
//             }).fromFile(req.file.path);
//             console.log("CSV parsed successfully.");

//             for (let x = 0; x < response.length; x++) {
//                 const partnerRevenue = parseFloat(response[x]['Total Payable (This Period)']);
//                 if (!isNaN(partnerRevenue) && partnerRevenue !== 0) {
//                     userData.push({
//                         accNum: response[x]['DEBIT_ACC_NO'],
//                     });
//                 }
//             }
//             console.log("Report Data Extracted");

//             const channelInvoices = await channelInvoiceModel.find();
//             const musicInvoices = await musicInvoiceModel.find();

//             for (const user of userData) {
//                 const { accNum, status } = user;
                
//                 // Update channel invoices
//                 const matchingChannelInvoice = channelInvoices.find(invoice => invoice.accountNumber === accNum);
//                 if (matchingChannelInvoice) {
//                     matchingChannelInvoice.status = 'paid';
//                     await matchingChannelInvoice.save();
//                     console.log(`Updated channel invoice for account ${accNum} to paid.`);
//                 }

//                 // Update music invoices
//                 const matchingMusicInvoice = musicInvoices.find(invoice => invoice.accountNumber === accNum);
//                 if (matchingMusicInvoice) {
//                     matchingMusicInvoice.status = 'paid';
//                     await matchingMusicInvoice.save();
//                     console.log(`Updated music invoice for account ${accNum} to paid.`);
//                 }
//             }

//             res.status(200).send({ success: true, msg: "Invoices updated successfully" });

//         } catch (error) {
//             console.error("Error parsing CSV:", error);
//             res.status(400).send({ success: false, msg: "Error parsing CSV" });
//         }
//     } catch (error) {
//         console.error("Error during importReport process:", error);
//         res.status(400).send({ success: false, msg: error.message });
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
        console.log("Starting importReport process...");

        let userData = [];
        const currentDate = new Date();
        const month = currentDate.toLocaleString('en-US', { month: 'long' });
        const year = currentDate.getFullYear();
        const formattedDate = `${month} ${year}`;
        console.log("Formatted date:", formattedDate);

        try {
            // Read and parse the CSV file
            const response = await csv({
                delimiter: ',', 
                noheader: false,
                headers: [
                    'PYMT_PROD_TYPE_CODE',
                    'PYMT_MODE',
                    'DEBIT_ACC_NO',
                    'BNF_NAME',
                    'BENE_ACC_NO',
                    'BENE_IFSC',
                    'AMOUNT',
                    'DEBIT_NARR',
                    'CREDIT_NARR',
                    'MOBILE_NUM',
                    'EMAIL_ID',
                    'REMARK',
                    'PYMT_DATE',
                    'REF_NO',
                    'ADDL_INFO1',
                    'ADDL_INFO2',
                    'ADDL_INFO3',
                    'ADDL_INFO4',
                    'ADDL_INFO5'
                ]
            }).fromFile(req.file.path);
            console.log("CSV parsed successfully.");

            // Extract account numbers
            for (const record of response) {
                const debitAccNo = record['DEBIT_ACC_NO'];
                if (debitAccNo) {
                    userData.push({ accNum: debitAccNo });
                }
            }
            console.log("Report Data Extracted");

            // Fetch invoices once to minimize database calls
            const channelInvoices = await channelInvoiceModel.find();
            const musicInvoices = await musicInvoiceModel.find();

            for (const user of userData) {
                const { accNum } = user;

                // Update channel invoices
                const matchingChannelInvoice = channelInvoices.find(invoice => invoice.accountNumber === accNum);
                if (matchingChannelInvoice && matchingChannelInvoice.status !== 'paid') {
                    matchingChannelInvoice.status = 'paid';
                    await matchingChannelInvoice.save();
                    console.log(`Updated channel invoice for account ${accNum} to paid.`);
                }

                // Update music invoices
                const matchingMusicInvoice = musicInvoices.find(invoice => invoice.accountNumber === accNum);
                if (matchingMusicInvoice && matchingMusicInvoice.status !== 'paid') {
                    matchingMusicInvoice.status = 'paid';
                    await matchingMusicInvoice.save();
                    console.log(`Updated music invoice for account ${accNum} to paid.`);
                }
            }

            res.status(200).send({ success: true, msg: "Invoices updated successfully" });

        } catch (error) {
            console.error("Error parsing CSV:", error);
            res.status(400).send({ success: false, msg: "Error parsing CSV" });
        }
    } catch (error) {
        console.error("Error during importReport process:", error);
        res.status(500).send({ success: false, msg: error.message }); // Changed to 500 for internal server error
    }
}

module.exports = {
    importReport
};
