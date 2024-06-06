const channelInvoiceModel = require('../database/model/channelInvoice');
const musicInvoiceModel = require('../database/model/musicInvoice');
const csv = require('csvtojson');






const importReport = async (req, res) => {
    try {
        console.log("Starting importReport process...");

        let userData = [];
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

            // Extract account numbers and amounts
            for (const record of response) {
                const debitAccNo = record['DEBIT_ACC_NO'];
                const amount = record['AMOUNT'];
                if (debitAccNo && !isNaN(amount)) {
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
                if (matchingChannelInvoice && matchingChannelInvoice.status !== 'paid') {
                    matchingChannelInvoice.status = 'paid';
                    await matchingChannelInvoice.save();
                    console.log(`Updated channel invoice for account ${accNum} and amount ${amount} to paid.`);
                }

                // Update music invoices
                const matchingMusicInvoice = musicInvoices.find(invoice => 
                    invoice.accNum === accNum && invoice.payout === amount);
                if (matchingMusicInvoice && matchingMusicInvoice.status !== 'paid') {
                    matchingMusicInvoice.status = 'paid';
                    await matchingMusicInvoice.save();
                    console.log(`Updated music invoice for account ${accNum} and amount ${amount} to paid.`);
                }
            }

            res.status(200).send({ success: true, msg: "Invoices updated successfully" });

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










// const channelInvoiceModel = require('../database/model/channelInvoice');
// const musicInvoiceModel = require('../database/model/musicInvoice');
// const csv = require('csvtojson');
// const PDFDocument = require('pdfkit');
// const nodemailer = require('nodemailer');
// const fs = require('fs');

// // Define generatePDF function only if it's not already defined
// if (typeof generatePDF === 'undefined') {
//     var generatePDF = (invoiceData) => {
//         return new Promise((resolve, reject) => {
//             const doc = new PDFDocument({ size: 'A4', margin: 50 });
//             const filePath = `./invoices_${Date.now()}.pdf`;
//             const writeStream = fs.createWriteStream(filePath);
//             doc.pipe(writeStream)
//             doc.image('./', 50, 45, { width: 50 })
//                .fontSize(20)
//                .text('Partner Revenue Report', 110, 57)
//                .fontSize(10)
//                .text(invoiceData.date, 200, 65, { align: 'right' });
//             doc.moveDown();
//             doc.fontSize(12)
//                .text(`Partner name: ${invoiceData.partnerName}`, 50, 150)
//                .text(`Licensor contact: ${invoiceData.licensorName}`, 350, 150);
//             doc.moveDown();
//             doc.fontSize(12)
//                .text('Total Revenue (in USD)', { underline: true })
//                .moveDown();

//                const revenueData = [
//                 { label: 'Youtube Channel Revenue', value: `$ ${invoiceData.ptRevenue}` },
//                 { label: 'Tax', value: `$ ${invoiceData.tax}` },
//                 { label: 'Youtube Channel Revenue (After tax)', value: `$ ${invoiceData.ptAfterTax}` },
//                 { label: '', value: '' },
//                 { label: 'Commission (in percentage)', value: `${invoiceData.commission}%` },
//                 { label: 'Commission amount', value: `$ ${invoiceData.commissionAmount}` },
//                 { label: '', value: '' },
//                 { label: 'Total Payout (in USD)', value: `$ ${invoiceData.totalPayout}` },
//                 { label: 'Conversion rate (in INR)', value: invoiceData.conversionRate },
//                 { label: 'Payout (April Payout in INR)', value: `INR ${invoiceData.payout}` }
//             ]

//             revenueData.forEach((item, index) => {
//                 const y = 200 + (index * 20);
//                 doc.text(item.label, 50, y)
//                    .text(item.value, 400, y, { align: 'right' });
//             });

//             // Footer
//             doc.moveDown(3)
//                .fontSize(10)
//                .text('Note: Lorem ipsum dolor sit amet consectetur. Id cras semper nulla amet hac urna sem.', { align: 'center' });

//             doc.moveDown()
//                .text('Gallery Vision', { align: 'center' })
//                .text('+0 (000) 123-4567 | hello@email.com', { align: 'center' });

//             doc.end();

//             writeStream.on('finish', () => {
//                 resolve(filePath);
//             });

//             writeStream.on('error', (err) => {
//                 reject(err);
//             });
//         });
//     };
// }

// if (typeof sendEmailWithPDF === 'undefined') {
//     var sendEmailWithPDF = async (filePath, email) => {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail', // Use your email service provider
//             auth: {
//                 user: 'your-email@gmail.com',
//                 pass: 'your-email-password'
//             }
//         });

//         const mailOptions = {
//             from: 'your-email@gmail.com',
//             to: email,
//             subject: 'Updated Invoices',
//             text: 'Please find the attached PDF of updated invoices.',
//             attachments: [
//                 {
//                     filename: 'updated_invoices.pdf',
//                     path: filePath
//                 }
//             ]
//         };

//         await transporter.sendMail(mailOptions);
//     };
// }
// if (typeof importReport === 'undefined') {
//     var importReport = async (req, res) => {
//         try {
//             console.log("Starting importReport process...");

//             let userData = [];
//             let updatedInvoices = [];

//             try {
//                 const response = await csv({
//                     delimiter: ',', 
//                     noheader: false,
//                     headers: [
//                         'PYMT_PROD_TYPE_CODE',
//                         'PYMT_MODE',
//                         'DEBIT_ACC_NO',
//                         'BNF_NAME',
//                         'BENE_ACC_NO',
//                         'BENE_IFSC',
//                         'AMOUNT',
//                         'DEBIT_NARR',
//                         'CREDIT_NARR',
//                         'MOBILE_NUM',
//                         'EMAIL_ID',
//                         'REMARK',
//                         'PYMT_DATE',
//                         'REF_NO',
//                         'ADDL_INFO1',
//                         'ADDL_INFO2',
//                         'ADDL_INFO3',
//                         'ADDL_INFO4',
//                         'ADDL_INFO5'
//                     ]
//                 }).fromFile(req.file.path);
//                 console.log("CSV parsed successfully.");
//                 for (const record of response) {
//                     const debitAccNo = record['DEBIT_ACC_NO'];
//                     const amount = record['AMOUNT'];
//                     if (debitAccNo && !isNaN(amount)) {
//                         userData.push({ accNum: debitAccNo, amount });
//                     }
//                 }
//                 console.log("Report Data Extracted");
//                 const channelInvoices = await channelInvoiceModel.find();
//                 const musicInvoices = await musicInvoiceModel.find();
//                 for (const user of userData) {
//                     const { accNum, amount } = user;
//                     // Update channel invoices
//                     const matchingChannelInvoice = channelInvoices.find(invoice => 
//                         invoice.accNum === accNum && invoice.payout === amount);
//                     if (matchingChannelInvoice && matchingChannelInvoice.status !== 'paid') {
//                         matchingChannelInvoice.status = 'paid';
//                         await matchingChannelInvoice.save();
//                         updatedInvoices.push({ accNum, amount, type: 'channel' });
//                         console.log(`Updated channel invoice for account ${accNum} and amount ${amount} to paid.`);
//                     }
//                     // Update music invoices
//                     const matchingMusicInvoice = musicInvoices.find(invoice => 
//                         invoice.accNum === accNum && invoice.payout === amount);
//                     if (matchingMusicInvoice && matchingMusicInvoice.status !== 'paid') {
//                         matchingMusicInvoice.status = 'paid';
//                         await matchingMusicInvoice.save();
//                         updatedInvoices.push({ accNum, amount, type: 'music' });
//                         console.log(`Updated music invoice for account ${accNum} and amount ${amount} to paid.`);
//                     }
//                 }
//                 if (updatedInvoices.length > 0) {
//                     const partnerName = "T-Series"; // Replace with actual data
//                     const licensorContact = "David John"; // Replace with actual data
//                     const totalRevenue = 200.00;
//                     const tax = 10.00;
//                     const youtubeRevenueAfterTax = 190.00;
//                     const commissionPercentage = 10;
//                     const commissionAmount = 19.00;
//                     const totalPayoutUSD = 171.00;
//                     const conversionRate = 83.51;
//                     const payoutINR = 14280.67;

//                     const pdfPath = await generatePDF(
//                         partnerName,
//                         licensorContact,
//                         totalRevenue,
//                         tax,
//                         youtubeRevenueAfterTax,
//                         commissionPercentage,
//                         commissionAmount,
//                         totalPayoutUSD,
//                         conversionRate,
//                         payoutINR
//                     );
//                     const licenseeEmail = "licensee@example.com"; 
//                     await sendEmailWithPDF(pdfPath, licenseeEmail);
//                     console.log("PDF sent to licenser's email.");
//                 }

//                 res.status(200).send({ success: true, msg: "Invoices updated successfully" });

//             } catch (error) {
//                 console.error("Error parsing CSV:", error);
//                 res.status(400).send({ success: false, msg: "Error parsing CSV" });
//             }
//         } catch (error) {
//             console.error("Error during importReport process:", error);
//             res.status(500).send({ success: false, msg: error.message });
//         }
//     };
// }

// module.exports = {
//     importReport
// };
