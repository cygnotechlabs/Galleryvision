const channelInvoiceModel = require('../database/model/channelInvoice');
const musicInvoiceModel = require('../database/model/musicInvoice');
const nodemailer = require('nodemailer');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

const tmp = require('tmp');

exports.processInvoicesAndSendEmails = async (req, res) => {
    try {
        const { date } = req.body;
        console.log("Mail sent Date:", date);
        const filter = {
            status: 'Paid',
            emailStatus: 'Not Sent',
            date: date
        };

        const channelInvoices = await channelInvoiceModel.find(filter);
        const musicInvoices = await musicInvoiceModel.find(filter);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'galleryvision24@gmail.com',
                pass: 'cles pbrx btua qvbc',
            },
        });

        const createChannelINRPDF = (invoice) => {
            const doc = new PDFDocument({ size: 'A4', margin: 50, padding: 50 });
            const fontPath = 'public/font/Satoshi-Bold.otf';
            doc.font(fontPath);
            const fileName = `Channel_Invoice_${invoice.invoiceNumber}.pdf`;
            const filePath = path.join(__dirname, fileName);

            doc.pipe(fs.createWriteStream(filePath));

            const ghostImagePath = 'public/image/ghostChannelINR.png';
            doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
            doc.fillColor('grey');
            doc
                .fontSize(12)
                .text(` ${invoice.date}`, 398, 65)
                doc
                .fillColor('white')
                .text(` ${invoice.partnerName}`, 134, 119)
                .text(` ${invoice.licensorName}`, 154, 147)
            doc
                .fillColor('black')
                .moveDown()
                .fontSize(10)
                .text(`${invoice.ptRevenue}`, 480, 295)
                .text(`${invoice.usTax}`, 480, 330)
                .text(`${invoice.ptAfterUsTax}`, 480, 364)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.commission}`, 480, 443)
                .text(`${invoice.commissionAmount}`, 480, 476)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.totalPayout}`, 480, 552)
                .text(`${invoice.conversionRate}`, 480, 586)
                .text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 620)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.payout}`, 480, 655)
                .moveDown()
                .fontSize(10);

            doc.end();
            return filePath;
        };

        const createChannelUSDPDF = (invoice) => {
            const doc = new PDFDocument({ size: 'A4', margin: 50, padding: 50 });
            const fontPath = 'public/font/Satoshi-Bold.otf';
            doc.font(fontPath);
            const fileName = `Channel_Invoice_${invoice.invoiceNumber}.pdf`;
            const filePath = path.join(__dirname, fileName);

            doc.pipe(fs.createWriteStream(filePath));

            const ghostImagePath = 'public/image/ghostChannelUSD.png';
            doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
            doc.fillColor('grey');
            doc
                .fontSize(12)
                .text(` ${invoice.date}`, 398, 65)
            doc
                .fillColor('white')
                .text(` ${invoice.partnerName}`, 134, 119)
                .text(` ${invoice.licensorName}`, 154, 147)
            doc
                .fillColor('black')
                .moveDown()
                .fontSize(10)
                .text(`${invoice.ptRevenue}`, 480, 295)
                .text(`${invoice.usTax}`, 480, 330)
                .text(`${invoice.ptAfterUsTax}`, 480, 364)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.commission}`, 480, 443)
                .text(`${invoice.commissionAmount}`, 480, 476)
                .moveDown()
                .fontSize(10)
                // .text(`${invoice.totalPayout}`, 480, 605)
                // .text(`${invoice.conversionRate}`, 480, 638)
                // .text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.payout}`, 480, 651)
                .moveDown()
                .fontSize(10);

            doc.end();
            return filePath;
        };

        const createMusicINRPDF = (invoice) => {
            const doc = new PDFDocument({ size: 'A4', margin: 50, padding: 50 });
            const fontPath = 'public/font/Satoshi-Bold.otf';
            doc.font(fontPath);
            const fileName = `Music_invoice_${invoice.invoiceNumber}.pdf`;
            const filePath = path.join(__dirname, fileName);

            doc.pipe(fs.createWriteStream(filePath));

            const ghostImagePath = 'public/image/ghostMusicINR.png';
            doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
            doc.fillColor('grey');
            doc
                .fontSize(12)
                .text(` ${invoice.date}`, 398, 65)
            doc
                .fillColor('white')
                .text(` ${invoice.partnerName}`, 134, 119)
                .text(` ${invoice.licensorName}`, 154, 147)
            doc
                .fillColor('black')
                .moveDown()
                .fontSize(10)
                .text(`${invoice.ptRevenue}`, 480, 294)
                // .text(`${invoice.usTax}`, 480, 349)
                // .text(`${invoice.ptAfterUsTax}`, 480, 360)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.commission}`, 480, 373)
                .text(`${invoice.commissionAmount}`, 480, 406)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.totalPayout}`, 480, 485)
                .text(`${invoice.conversionRate}`, 480, 518)
                .text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 555)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.payout}`, 480, 588)
                .moveDown()
                .fontSize(10);

            doc.end();
            return filePath;
        };

        const createMusicUSDPDF = (invoice) => {
            const doc = new PDFDocument({ size: 'A4', margin: 50, padding: 50 });
            const fontPath = 'public/font/Satoshi-Bold.otf';
            doc.font(fontPath);
            const fileName = `Music_invoice_${invoice.invoiceNumber}.pdf`;
            const filePath = path.join(__dirname, fileName);

            doc.pipe(fs.createWriteStream(filePath));

            const ghostImagePath = 'public/image/ghostMusicUSD.png';
            doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
            doc.fillColor('grey');
            doc
                .fontSize(12)
                .text(` ${invoice.date}`, 398, 65)
                doc
                .fillColor('white')
                .text(` ${invoice.partnerName}`, 134, 119)
                .text(` ${invoice.licensorName}`, 154, 147)
            doc
                .fillColor('black')
                .moveDown()
                .fontSize(10)
                .text(`${invoice.ptRevenue}`, 480, 294)
                // .text(`${invoice.usTax}`, 480, 349)
                // .text(`${invoice.ptAfterUsTax}`, 480, 360)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.commission}`, 480, 373)
                .text(`${invoice.commissionAmount}`, 480, 406)
                .moveDown()
                .fontSize(10)
                // .text(`${invoice.totalPayout}`, 480, 605)
                // .text(`${invoice.conversionRate}`, 480, 638)
                // .text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.payout}`, 480, 652)
                .moveDown()
                .fontSize(10);

            doc.end();
            return filePath;
        };

        const sendEmailWithPDF = async (invoice, type, createPDF) => {
            const pdfPath = createPDF(invoice);

            const mailOptions = {
                from: 'galleryvision24@gmail.com',
                to: invoice.licensorEmail,
                subject: `Paid ${type.charAt(0).toUpperCase() + type.slice(1)} Invoice (${invoice.currency})`,
                text: `Please find the attached paid ${type} invoice (${invoice.currency}).`,
                attachments: [
                    {
                        // filename: `${type.charAt(0).toUpperCase() + type.slice(1)}_Invoice_${invoice.invoiceNumber}.pdf`,
                        filename: `${invoice.invoiceNumber}.pdf`,
                        path: pdfPath,
                    },
                ],
            };

            await transporter.sendMail(mailOptions);

            // Update the email status to "Sent"
            await invoice.updateOne({ emailStatus: 'Sent' });

            // Delete the PDF file after sending the email
            fs.unlink(pdfPath, (err) => {
                if (err) {
                    console.error(`Failed to delete file: ${pdfPath}`, err);
                } else {
                    console.log(`File deleted: ${pdfPath}`);
                }
            });
        };

        const processInvoicesByTypeAndCurrency = async (invoices, type, createPDF) => {
            for (const invoice of invoices) {
                await sendEmailWithPDF(invoice, type, createPDF);
            }
        };

        await processInvoicesByTypeAndCurrency(channelInvoices.filter(i => i.currency === 'INR'), 'channel', createChannelINRPDF);
        await processInvoicesByTypeAndCurrency(channelInvoices.filter(i => i.currency === 'USD'), 'channel', createChannelUSDPDF);
        await processInvoicesByTypeAndCurrency(musicInvoices.filter(i => i.currency === 'INR'), 'music', createMusicINRPDF);
        await processInvoicesByTypeAndCurrency(musicInvoices.filter(i => i.currency === 'USD'), 'music', createMusicUSDPDF);

        console.log('Invoices processed and emails sent successfully.');
        res.status(200).json({ success: true, message: 'Invoices processed and emails sent successfully.' });
    } catch (error) {
        console.error('Error processing invoices and sending emails:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


// download single invoice pdf
// exports.downloadInvoicePDF = async (req, res) => {
//     try {
//         const { invoiceNumber } = req.body;

//         console.log(`Received request with invoiceNumber: ${invoiceNumber}`);

//         // Fetch the invoice from both collections
//         let invoice = await channelInvoiceModel.findOne({ invoiceNumber });
//         let invoiceType = 'channel';

//         if (!invoice) {
//             invoice = await musicInvoiceModel.findOne({ invoiceNumber });
//             invoiceType = 'music';
//         }

//         if (!invoice) {
//             return res.status(404).json({ success: false, message: 'Invoice not found' });
//         }

//         // Define functions to create the PDF based on the type and currency
//         const createChannelINRPDF = (invoice) => {
//             const doc = new PDFDocument({ size: 'A4', margin: 50 });
//             const fontPath = 'public/font/Satoshi-Bold.otf';
//             const fileName = `Channel_Invoice_${invoice.invoiceNumber}.pdf`;
//             const filePath = path.join(__dirname, fileName);

//             doc.font(fontPath);
//             doc.pipe(fs.createWriteStream(filePath));

//             const ghostImagePath = 'public/image/ghostChannelINR.png';
//             doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
//             doc.fillColor('grey');

//             doc.fontSize(12).text(` ${invoice.date}`, 398, 65);
//             doc.fillColor('white').text(` ${invoice.partnerName}`, 130, 126).text(` ${invoice.licensorName}`, 150, 162);
//             doc.fillColor('grey').fontSize(10);
//             doc.text(`${invoice.ptRevenue}`, 480, 315).text(`${invoice.usTax}`, 480, 349).text(`${invoice.ptAfterUsTax}`, 480, 360);
//             doc.text(`${invoice.commission}`, 480, 476).text(`${invoice.commissionAmount}`, 480, 510);
//             doc.text(`${invoice.totalPayout}`, 480, 605).text(`${invoice.conversionRate}`, 480, 638).text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648);
//             doc.text(`${invoice.payout}`, 480, 672);

//             doc.end();
//             return filePath;
//         };

//         const createChannelUSDPDF = (invoice) => {
//             const doc = new PDFDocument({ size: 'A4', margin: 50 });
//             const fontPath = 'public/font/Satoshi-Bold.otf';
//             const fileName = `Channel_Invoice_${invoice.invoiceNumber}.pdf`;
//             const filePath = path.join(__dirname, fileName);

//             doc.font(fontPath);
//             doc.pipe(fs.createWriteStream(filePath));

//             const ghostImagePath = 'public/image/ghostChannelUSD.png';
//             doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
//             doc.fillColor('grey');

//             doc.fontSize(12).text(` ${invoice.date}`, 398, 65);
//             doc.fillColor('white').text(` ${invoice.partnerName}`, 130, 126).text(` ${invoice.licensorName}`, 150, 162);
//             doc.fillColor('grey').fontSize(10);
//             doc.text(`${invoice.ptRevenue}`, 480, 315).text(`${invoice.usTax}`, 480, 349).text(`${invoice.ptAfterUsTax}`, 480, 360);
//             doc.text(`${invoice.commission}`, 480, 476).text(`${invoice.commissionAmount}`, 480, 510);
//             doc.text(`${invoice.totalPayout}`, 480, 605).text(`${invoice.conversionRate}`, 480, 638).text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648);
//             doc.text(`${invoice.payout}`, 480, 672);

//             doc.end();
//             return filePath;
//         };

//         const createMusicINRPDF = (invoice) => {
//             const doc = new PDFDocument({ size: 'A4', margin: 50 });
//             const fontPath = 'public/font/Satoshi-Bold.otf';
//             const fileName = `Music_Invoice_${invoice.invoiceNumber}.pdf`;
//             const filePath = path.join(__dirname, fileName);

//             doc.font(fontPath);
//             doc.pipe(fs.createWriteStream(filePath));
//             const ghostImagePath = 'public/image/ghostMusicINR.png';
//             doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
//             doc.fillColor('grey');

//             doc.fontSize(12).text(` ${invoice.date}`, 398, 65);
//             doc.fillColor('white').text(` ${invoice.partnerName}`, 130, 126).text(` ${invoice.licensorName}`, 150, 162);
//             doc.fillColor('grey').fontSize(10);
//             doc.text(`${invoice.ptRevenue}`, 480, 315).text(`${invoice.usTax}`, 480, 349).text(`${invoice.ptAfterUsTax}`, 480, 360);
//             doc.text(`${invoice.commission}`, 480, 476).text(`${invoice.commissionAmount}`, 480, 510);
//             doc.text(`${invoice.totalPayout}`, 480, 605).text(`${invoice.conversionRate}`, 480, 638).text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648);
//             doc.text(`${invoice.payout}`, 480, 672);

//             doc.end();
//             return filePath;
//         };

//         const createMusicUSDPDF = (invoice) => {
//             const doc = new PDFDocument({ size: 'A4', margin: 50 });
//             const fontPath = 'public/font/Satoshi-Bold.otf';
//             const fileName = `Music_Invoice_${invoice.invoiceNumber}.pdf`;
//             const filePath = path.join(__dirname, fileName);

//             doc.font(fontPath);
//             doc.pipe(fs.createWriteStream(filePath));
//             const ghostImagePath = 'public/image/ghostMusicUSD.png';
//             doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
//             doc.fillColor('grey');

//             doc.fontSize(12).text(` ${invoice.date}`, 398, 65);
//             doc.fillColor('white').text(` ${invoice.partnerName}`, 130, 126).text(` ${invoice.licensorName}`, 150, 162);
//             doc.fillColor('grey').fontSize(10);
//             doc.text(`${invoice.ptRevenue}`, 480, 315).text(`${invoice.usTax}`, 480, 349).text(`${invoice.ptAfterUsTax}`, 480, 360);
//             doc.text(`${invoice.commission}`, 480, 476).text(`${invoice.commissionAmount}`, 480, 510);
//             doc.text(`${invoice.totalPayout}`, 480, 605).text(`${invoice.conversionRate}`, 480, 638).text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648);
//             doc.text(`${invoice.payout}`, 480, 672);

//             doc.end();
//             return filePath;
//         };

//         // Select the appropriate PDF creation function based on the model and currency
//         let pdfPath;
//         if (invoiceType === 'channel' && invoice.currency === 'INR') {
//             pdfPath = createChannelINRPDF(invoice);
//         } else if (invoiceType === 'channel' && invoice.currency === 'USD') {
//             pdfPath = createChannelUSDPDF(invoice);
//         } else if (invoiceType === 'music' && invoice.currency === 'INR') {
//             pdfPath = createMusicINRPDF(invoice);
//         } else if (invoiceType === 'music' && invoice.currency === 'USD') {
//             pdfPath = createMusicUSDPDF(invoice);
//         } else {
//             return res.status(400).json({ success: false, message: 'Invalid type or currency' });
//         }

//         if (!pdfPath) {
//             return res.status(500).json({ success: false, message: 'Error generating PDF' });
//         }

//         // Send the PDF as a response to the frontend
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=${path.basename(pdfPath)}`);
//         res.sendFile(pdfPath, (err) => {
//             if (err) {
//                 console.error('Error sending the PDF:', err);
//                 return res.status(500).json({ success: false, message: 'Error sending the PDF' });
//             }

//             // Delete the PDF file after sending it
//             fs.unlink(pdfPath, (err) => {
//                 if (err) {
//                     console.error(`Failed to delete file: ${pdfPath}`, err);
//                 } else {
//                     console.log(`File deleted: ${pdfPath}`);
//                 }
//             });
//         });
//     } catch (error) {
//         console.error('Error generating or sending invoice PDF:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };

exports.downloadInvoicePDF = async (req, res) => {
    try {
        console.log(req.body);
        const { invoiceNumber } = req.body;

        console.log(`Received request with invoiceNumber: ${invoiceNumber}`);

        // Fetch the invoice from both collections
        let invoice = await channelInvoiceModel.findOne({ invoiceNumber });
        let invoiceType = 'channel';

        if (!invoice) {
            invoice = await musicInvoiceModel.findOne({ invoiceNumber });
            invoiceType = 'music';
        }

        if (!invoice) {
            return res.status(404).json({ success: false, message: 'Invoice not found' });
        }

        // Define functions to create the PDF based on the type and currency
        const ChannelINRPDF = (invoice) => {
            return new Promise((resolve, reject) => {
                const doc = new PDFDocument({ size: 'A4', margin: 50 });
                const fontPath = 'public/font/Satoshi-Bold.otf';
                const fileName = `Channel_Invoice_${invoice.invoiceNumber}.pdf`;
                const filePath = path.join(__dirname, fileName);

                doc.font(fontPath);
                const stream = fs.createWriteStream(filePath);
                doc.pipe(stream);

                const ghostImagePath = 'public/image/ghostChannelINR.png';
                doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
                doc.fillColor('grey');

                doc
                .fontSize(12)
                .text(` ${invoice.date}`, 398, 65)
                doc
                .fillColor('white')
                .text(` ${invoice.partnerName}`, 134, 119)
                .text(` ${invoice.licensorName}`, 154, 147)
            doc
                .fillColor('black')
                .moveDown()
                .fontSize(10)
                .text(`${invoice.ptRevenue}`, 480, 295)
                .text(`${invoice.usTax}`, 480, 330)
                .text(`${invoice.ptAfterUsTax}`, 480, 364)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.commission}`, 480, 443)
                .text(`${invoice.commissionAmount}`, 480, 476)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.totalPayout}`, 480, 552)
                .text(`${invoice.conversionRate}`, 480, 586)
                .text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 620)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.payout}`, 480, 655)
                .moveDown()
                .fontSize(10);

                // doc.fontSize(12).text(` ${invoice.date}`, 398, 65);
                // doc.fillColor('white').text(` ${invoice.partnerName}`, 130, 126).text(` ${invoice.licensorName}`, 150, 162);
                // doc.fillColor('grey').fontSize(10);
                // doc.text(`${invoice.ptRevenue}`, 480, 315).text(`${invoice.usTax}`, 480, 349).text(`${invoice.ptAfterUsTax}`, 480, 360);
                // doc.text(`${invoice.commission}`, 480, 476).text(`${invoice.commissionAmount}`, 480, 510);
                // doc.text(`${invoice.totalPayout}`, 480, 605).text(`${invoice.conversionRate}`, 480, 638).text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648);
                // doc.text(`${invoice.payout}`, 480, 672);

                doc.end();

                stream.on('finish', () => resolve(filePath));
                stream.on('error', reject);
            });
        };

        const ChannelUSDPDF = (invoice) => {
            return new Promise((resolve, reject) => {
                const doc = new PDFDocument({ size: 'A4', margin: 50 });
                const fontPath = 'public/font/Satoshi-Bold.otf';
                const fileName = `Channel_Invoice_${invoice.invoiceNumber}.pdf`;
                const filePath = path.join(__dirname, fileName);

                doc.font(fontPath);
                const stream = fs.createWriteStream(filePath);
                doc.pipe(stream);

                const ghostImagePath = 'public/image/ghostChannelUSD.png';
                doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
                doc.fillColor('grey');

                doc
                .fontSize(12)
                .text(` ${invoice.date}`, 398, 65)
            doc
                .fillColor('white')
                .text(` ${invoice.partnerName}`, 134, 119)
                .text(` ${invoice.licensorName}`, 154, 147)
            doc
                .fillColor('black')
                .moveDown()
                .fontSize(10)
                .text(`${invoice.ptRevenue}`, 480, 295)
                .text(`${invoice.usTax}`, 480, 330)
                .text(`${invoice.ptAfterUsTax}`, 480, 364)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.commission}`, 480, 443)
                .text(`${invoice.commissionAmount}`, 480, 476)
                .moveDown()
                .fontSize(10)
                // .text(`${invoice.totalPayout}`, 480, 605)
                // .text(`${invoice.conversionRate}`, 480, 638)
                // .text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.payout}`, 480, 651)
                .moveDown()
                .fontSize(10);

                // doc.fontSize(12).text(` ${invoice.date}`, 398, 65);
                // doc.fillColor('white').text(` ${invoice.partnerName}`, 130, 126).text(` ${invoice.licensorName}`, 150, 162);
                // doc.fillColor('grey').fontSize(10);
                // doc.text(`${invoice.ptRevenue}`, 480, 315).text(`${invoice.usTax}`, 480, 349).text(`${invoice.ptAfterUsTax}`, 480, 360);
                // doc.text(`${invoice.commission}`, 480, 476).text(`${invoice.commissionAmount}`, 480, 510);
                // doc.text(`${invoice.totalPayout}`, 480, 605).text(`${invoice.conversionRate}`, 480, 638).text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648);
                // doc.text(`${invoice.payout}`, 480, 672);

                doc.end();

                stream.on('finish', () => resolve(filePath));
                stream.on('error', reject);
            });
        };

        const MusicINRPDF = (invoice) => {
            return new Promise((resolve, reject) => {
                const doc = new PDFDocument({ size: 'A4', margin: 50 });
                const fontPath = 'public/font/Satoshi-Bold.otf';
                const fileName = `Music_Invoice_${invoice.invoiceNumber}.pdf`;
                const filePath = path.join(__dirname, fileName);

                doc.font(fontPath);
                const stream = fs.createWriteStream(filePath);
                doc.pipe(stream);

                const ghostImagePath = 'public/image/ghostMusicINR.png';
                doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
                doc.fillColor('grey');

                doc
                .fontSize(12)
                .text(` ${invoice.date}`, 398, 65)
            doc
                .fillColor('white')
                .text(` ${invoice.partnerName}`, 134, 119)
                .text(` ${invoice.licensorName}`, 154, 147)
            doc
                .fillColor('black')
                .moveDown()
                .fontSize(10)
                .text(`${invoice.ptRevenue}`, 480, 294)
                // .text(`${invoice.usTax}`, 480, 349)
                // .text(`${invoice.ptAfterUsTax}`, 480, 360)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.commission}`, 480, 373)
                .text(`${invoice.commissionAmount}`, 480, 406)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.totalPayout}`, 480, 485)
                .text(`${invoice.conversionRate}`, 480, 518)
                .text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 555)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.payout}`, 480, 588)
                .moveDown()
                .fontSize(10);


                // doc.fontSize(12).text(` ${invoice.date}`, 398, 65);
                // doc.fillColor('white').text(` ${invoice.partnerName}`, 130, 126).text(` ${invoice.licensorName}`, 150, 162);
                // doc.fillColor('grey').fontSize(10);
                // doc.text(`${invoice.ptRevenue}`, 480, 315).text(`${invoice.usTax}`, 480, 349).text(`${invoice.ptAfterUsTax}`, 480, 360);
                // doc.text(`${invoice.commission}`, 480, 476).text(`${invoice.commissionAmount}`, 480, 510);
                // doc.text(`${invoice.totalPayout}`, 480, 605).text(`${invoice.conversionRate}`, 480, 638).text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648);
                // doc.text(`${invoice.payout}`, 480, 672);

                doc.end();

                stream.on('finish', () => resolve(filePath));
                stream.on('error', reject);
            });
        };

        const MusicUSDPDF = (invoice) => {
            return new Promise((resolve, reject) => {
                const doc = new PDFDocument({ size: 'A4', margin: 50 });
                const fontPath = 'public/font/Satoshi-Bold.otf';
                const fileName = `Music_Invoice_${invoice.invoiceNumber}.pdf`;
                const filePath = path.join(__dirname, fileName);

                doc.font(fontPath);
                const stream = fs.createWriteStream(filePath);
                doc.pipe(stream);

                const ghostImagePath = 'public/image/ghostMusicUSD.png';
                doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
                doc.fillColor('grey');

                doc
                .fontSize(12)
                .text(` ${invoice.date}`, 398, 65)
                doc
                .fillColor('white')
                .text(` ${invoice.partnerName}`, 134, 119)
                .text(` ${invoice.licensorName}`, 154, 147)
            doc
                .fillColor('black')
                .moveDown()
                .fontSize(10)
                .text(`${invoice.ptRevenue}`, 480, 294)
                // .text(`${invoice.usTax}`, 480, 349)
                // .text(`${invoice.ptAfterUsTax}`, 480, 360)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.commission}`, 480, 373)
                .text(`${invoice.commissionAmount}`, 480, 406)
                .moveDown()
                .fontSize(10)
                // .text(`${invoice.totalPayout}`, 480, 605)
                // .text(`${invoice.conversionRate}`, 480, 638)
                // .text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648)
                .moveDown()
                .fontSize(10)
                .text(`${invoice.payout}`, 480, 652)
                .moveDown()
                .fontSize(10);

                // doc.fontSize(12).text(` ${invoice.date}`, 398, 65);
                // doc.fillColor('white').text(` ${invoice.partnerName}`, 130, 126).text(` ${invoice.licensorName}`, 150, 162);
                // doc.fillColor('grey').fontSize(10);
                // doc.text(`${invoice.ptRevenue}`, 480, 315).text(`${invoice.usTax}`, 480, 349).text(`${invoice.ptAfterUsTax}`, 480, 360);
                // doc.text(`${invoice.commission}`, 480, 476).text(`${invoice.commissionAmount}`, 480, 510);
                // doc.text(`${invoice.totalPayout}`, 480, 605).text(`${invoice.conversionRate}`, 480, 638).text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648);
                // doc.text(`${invoice.payout}`, 480, 672);

                doc.end();

                stream.on('finish', () => resolve(filePath));
                stream.on('error', reject);
            });
        };

        // Select the appropriate PDF creation function based on the model and currency
        let pdfPath;
        if (invoiceType === 'channel' && invoice.currency === 'INR') {
            pdfPath = await ChannelINRPDF(invoice);
        } else if (invoiceType === 'channel' && invoice.currency === 'USD') {
            pdfPath = await ChannelUSDPDF(invoice);
        } else if (invoiceType === 'music' && invoice.currency === 'INR') {
            pdfPath = await MusicINRPDF(invoice);
        } else if (invoiceType === 'music' && invoice.currency === 'USD') {
            pdfPath = await MusicUSDPDF(invoice);
        } else {
            return res.status(400).json({ success: false, message: 'Invalid type or currency' });
        }

        if (!pdfPath) {
            return res.status(500).json({ success: false, message: 'Error generating PDF' });
        }

        // Send the PDF as a response to the frontend
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${path.basename(pdfPath)}`);
        res.sendFile(pdfPath, (err) => {
            if (err) {
                console.error('Error sending the PDF:', err);
                return res.status(500).json({ success: false, message: 'Error sending the PDF' });
            }

            // Delete the PDF file after sending it
            fs.unlink(pdfPath, (err) => {
                if (err) {
                    console.error(`Failed to delete file: ${pdfPath}`, err);
                } else {
                    console.log(`File deleted: ${pdfPath}`);
                }
            });
        });
    } catch (error) {
        console.error('Error generating or sending invoice PDF:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



// latest

// exports.downloadInvoicePDF = async (req, res) => {
//     try {
//         const { invoiceNumber } = req.body;

//         console.log(`Received request with invoiceNumber: ${invoiceNumber}`);

//         // Fetch the invoice from both collections
//         let invoice = await channelInvoiceModel.findOne({ invoiceNumber });
//         let invoiceType = 'channel';

//         if (!invoice) {
//             invoice = await musicInvoiceModel.findOne({ invoiceNumber });
//             invoiceType = 'music';
//         }

//         if (!invoice) {
//             return res.status(404).json({ success: false, message: 'Invoice not found' });
//         }

//         // Define functions to create the PDF based on the type and currency
//         const ChannelINRPDF = (invoice) => {
//             return new Promise((resolve, reject) => {
//                 try {
//                     const doc = new PDFDocument({ size: 'A4', margin: 50 });
//                     const fontPath = 'public/font/Satoshi-Bold.otf';
//                     const tempFile = tmp.fileSync({ postfix: '.pdf' });
//                     const filePath = tempFile.name;

//                     doc.font(fontPath);
//                     doc.pipe(fs.createWriteStream(filePath));

//                     const ghostImagePath = 'public/image/ghostChannelINR.png';
//                     doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
//                     doc.fillColor('grey');

//                     doc.fontSize(12).text(` ${invoice.date}`, 398, 65);
//                     doc.fillColor('white').text(` ${invoice.partnerName}`, 130, 126).text(` ${invoice.licensorName}`, 150, 162);
//                     doc.fillColor('grey').fontSize(10);
//                     doc.text(`${invoice.ptRevenue}`, 480, 315).text(`${invoice.usTax}`, 480, 349).text(`${invoice.ptAfterUsTax}`, 480, 360);
//                     doc.text(`${invoice.commission}`, 480, 476).text(`${invoice.commissionAmount}`, 480, 510);
//                     doc.text(`${invoice.totalPayout}`, 480, 605).text(`${invoice.conversionRate}`, 480, 638).text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648);
//                     doc.text(`${invoice.payout}`, 480, 672);

//                     doc.end();

//                     doc.on('finish', () => resolve(filePath));
//                     doc.on('error', (err) => reject(err));
//                 } catch (err) {
//                     reject(err);
//                 }
//             });
//         };

//         const ChannelUSDPDF = (invoice) => {
//             return new Promise((resolve, reject) => {
//                 try {
//                     const doc = new PDFDocument({ size: 'A4', margin: 50 });
//                     const fontPath = 'public/font/Satoshi-Bold.otf';
//                     const tempFile = tmp.fileSync({ postfix: '.pdf' });
//                     const filePath = tempFile.name;

//                     doc.font(fontPath);
//                     doc.pipe(fs.createWriteStream(filePath));

//                     const ghostImagePath = 'public/image/ghostChannelUSD.png';
//                     doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
//                     doc.fillColor('grey');

//                     doc.fontSize(12).text(` ${invoice.date}`, 398, 65);
//                     doc.fillColor('white').text(` ${invoice.partnerName}`, 130, 126).text(` ${invoice.licensorName}`, 150, 162);
//                     doc.fillColor('grey').fontSize(10);
//                     doc.text(`${invoice.ptRevenue}`, 480, 315).text(`${invoice.usTax}`, 480, 349).text(`${invoice.ptAfterUsTax}`, 480, 360);
//                     doc.text(`${invoice.commission}`, 480, 476).text(`${invoice.commissionAmount}`, 480, 510);
//                     doc.text(`${invoice.totalPayout}`, 480, 605).text(`${invoice.conversionRate}`, 480, 638).text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648);
//                     doc.text(`${invoice.payout}`, 480, 672);

//                     doc.end();

//                     doc.on('finish', () => resolve(filePath));
//                     doc.on('error', (err) => reject(err));
//                 } catch (err) {
//                     reject(err);
//                 }
//             });
//         };

//         const MusicINRPDF = (invoice) => {
//             return new Promise((resolve, reject) => {
//                 try {
//                     const doc = new PDFDocument({ size: 'A4', margin: 50 });
//                     const fontPath = 'public/font/Satoshi-Bold.otf';
//                     const tempFile = tmp.fileSync({ postfix: '.pdf' });
//                     const filePath = tempFile.name;

//                     doc.font(fontPath);
//                     doc.pipe(fs.createWriteStream(filePath));
//                     const ghostImagePath = 'public/image/ghostMusicINR.png';
//                     doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
//                     doc.fillColor('grey');

//                     doc.fontSize(12).text(` ${invoice.date}`, 398, 65);
//                     doc.fillColor('white').text(` ${invoice.partnerName}`, 130, 126).text(` ${invoice.licensorName}`, 150, 162);
//                     doc.fillColor('grey').fontSize(10);
//                     doc.text(`${invoice.ptRevenue}`, 480, 315).text(`${invoice.usTax}`, 480, 349).text(`${invoice.ptAfterUsTax}`, 480, 360);
//                     doc.text(`${invoice.commission}`, 480, 476).text(`${invoice.commissionAmount}`, 480, 510);
//                     doc.text(`${invoice.totalPayout}`, 480, 605).text(`${invoice.conversionRate}`, 480, 638).text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648);
//                     doc.text(`${invoice.payout}`, 480, 672);

//                     doc.end();

//                     doc.on('finish', () => resolve(filePath));
//                     doc.on('error', (err) => reject(err));
//                 } catch (err) {
//                     reject(err);
//                 }
//             });
//         };

//         const MusicUSDPDF = (invoice) => {
//             return new Promise((resolve, reject) => {
//                 try {
//                     const doc = new PDFDocument({ size: 'A4', margin: 50 });
//                     const fontPath = 'public/font/Satoshi-Bold.otf';
//                     const tempFile = tmp.fileSync({ postfix: '.pdf' });
//                     const filePath = tempFile.name;

//                     doc.font(fontPath);
//                     doc.pipe(fs.createWriteStream(filePath));
//                     const ghostImagePath = 'public/image/ghostMusicUSD.png';
//                     doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
//                     doc.fillColor('grey');

//                     doc.fontSize(12).text(` ${invoice.date}`, 398, 65);
//                     doc.fillColor('white').text(` ${invoice.partnerName}`, 130, 126).text(` ${invoice.licensorName}`, 150, 162);
//                     doc.fillColor('grey').fontSize(10);
//                     doc.text(`${invoice.ptRevenue}`, 480, 315).text(`${invoice.usTax}`, 480, 349).text(`${invoice.ptAfterUsTax}`, 480, 360);
//                     doc.text(`${invoice.commission}`, 480, 476).text(`${invoice.commissionAmount}`, 480, 510);
//                     doc.text(`${invoice.totalPayout}`, 480, 605).text(`${invoice.conversionRate}`, 480, 638).text(`${invoice.tdsTax}(${invoice.tds}%)`, 480, 648);
//                     doc.text(`${invoice.payout}`, 480, 672);

//                     doc.end();

//                     doc.on('finish', () => resolve(filePath));
//                     doc.on('error', (err) => reject(err));
//                 } catch (err) {
//                     reject(err);
//                 }
//             });
//         };

//         // Select the appropriate PDF creation function based on the model and currency
//         let pdfPath;
//         if (invoiceType === 'channel' && invoice.currency === 'INR') {
//             pdfPath = await ChannelINRPDF(invoice);
//         } else if (invoiceType === 'channel' && invoice.currency === 'USD') {
//             pdfPath = await ChannelUSDPDF(invoice);
//         } else if (invoiceType === 'music' && invoice.currency === 'INR') {
//             pdfPath = await MusicINRPDF(invoice);
//         } else if (invoiceType === 'music' && invoice.currency === 'USD') {
//             pdfPath = await MusicUSDPDF(invoice);
//         } else {
//             return res.status(400).json({ success: false, message: 'Invalid type or currency' });
//         }

//         if (!pdfPath) {
//             return res.status(500).json({ success: false, message: 'Error generating PDF' });
//         }

//         // Send the PDF as a response to the frontend
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=${path.basename(pdfPath)}`);
//         res.sendFile(pdfPath, (err) => {
//             if (err) {
//                 console.error('Error sending the PDF:', err);
//                 return res.status(500).json({ success: false, message: 'Error sending the PDF' });
//             }

//             // Delete the PDF file after sending it
//             fs.unlink(pdfPath, (err) => {
//                 if (err) {
//                     console.error(`Failed to delete file: ${pdfPath}`, err);
//                 } else {
//                     console.log(`File deleted: ${pdfPath}`);
//                 }
//             });
//         });
//     } catch (error) {
//         console.error('Error generating or sending invoice PDF:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };