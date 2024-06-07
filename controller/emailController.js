const channelInvoiceModel = require('../database/model/channelInvoice');
const musicInvoiceModel = require('../database/model/musicInvoice');
const nodemailer = require('nodemailer');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');

exports.processInvoicesAndSendEmails = async (req, res) => {
    try {
        const { date } = req.body;
        console.log("Mail sent Date :",date);
        const filter = {
            status: 'Paid',
            emailStatus: 'Not Sent',
            date: date
        };

        const paidChannelInvoices = await channelInvoiceModel.find(filter);
        const paidMusicInvoices = await musicInvoiceModel.find(filter);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'galleryvision24@gmail.com',
                pass: 'cles pbrx btua qvbc',
            },
        });

        const createINRPDF = (invoice, type) => {
            const doc = new PDFDocument({ size: 'A4', margin: 50, padding: 50 });
            const fontPath = 'public/font/Satoshi-Bold.otf';
            doc.font(fontPath);
            const fileName = `${type}_invoice_${invoice._id}.pdf`;
            const filePath = path.join(__dirname, fileName);

            doc.pipe(fs.createWriteStream(filePath));

            // Add header with INR ghost image
            const ghostImagePath = 'public/image/ghostINR.png';
            doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
            doc.fillColor('grey');

            // Insert invoice details for INR
            doc
                .fontSize(12)
                .text(` ${invoice.date}`, 398, 65)
                .text(` ${invoice.partnerName}`, 130, 126)
                .text(` ${invoice.licensorName}`,150, 162)
                .moveDown()
                .fontSize(12)
                .text('', 50, 150)
                .fontSize(10)
                .text(`${invoice.ptRevenue}`, 500, 315)
                .text(`${invoice.tax}`, 500, 349)
                .text(`${invoice.ptAfterTax}`, 500, 384)
                .moveDown()
                .fontSize(12)
                .text('', 50, 250)
                .fontSize(10)
                .text(`${invoice.commission}`, 500, 476)
                .text(`${invoice.commissionAmount}`, 500, 510)
                .moveDown()
                .fontSize(12)
                .text('', 50, 310)
                .fontSize(10)
                .text(`${invoice.totalPayout}`, 500, 605)
                .text(`${invoice.conversionRate}`, 500, 638)
                .moveDown()
                .fontSize(12)
                .text('', 50, 350)
                .fontSize(10)
                .text(` ${invoice.payout}`, 495, 672)
                .moveDown()
                .fontSize(10)
                
                .moveDown()
                .fontSize(10)
                // .text('Gallery Vision', 100, 670)
                // .text('+0 (000) 123-4567 | hello@email.com', 200, 670);

            doc.end();
            return filePath;
        };

        const createUSDPDF = (invoice, type) => {
            const doc = new PDFDocument({ size: 'A4', margin: 50, padding: 50 });
            const fontPath = 'public/font/Satoshi-Bold.otf';
            doc.font(fontPath);
            const fileName = `${type}_invoice_${invoice._id}.pdf`;
            const filePath = path.join(__dirname, fileName);

            doc.pipe(fs.createWriteStream(filePath));

            // Add header with USD ghost image
            const ghostImagePath = 'public/image/ghostUSD.png';
            doc.image(ghostImagePath, 0, 0, { width: 595.28, height: 841.89 });
            doc.fillColor('grey');

            // Insert invoice details for USD
            doc
            .fontSize(12)
            .text(` ${invoice.date}`, 398, 65)
            .text(` ${invoice.partnerName}`, 130, 126)
            .text(` ${invoice.licensorName}`,150, 162)
            .moveDown()
            .fontSize(12)
            .text('', 50, 150)
            .fontSize(10)
            .text(`${invoice.ptRevenue}`, 500, 315)
            .text(`${invoice.tax}`, 500, 349)
            .text(`${invoice.ptAfterTax}`, 500, 384)
            .moveDown()
            .fontSize(12)
            .text('', 50, 250)
            .fontSize(10)
            .text(`${invoice.commission}`, 500, 476)
            .text(`${invoice.commissionAmount}`, 500, 510)
            .moveDown()
            .fontSize(12)
            .text('', 50, 310)
            .fontSize(10)
            .text(`${invoice.payout}`, 500, 645)

            .moveDown()
            .fontSize(12)
            .text('', 50, 350)
            .fontSize(10)

            .moveDown()
            .fontSize(10)
            
            .moveDown()
            .fontSize(10)
                // .text('Gallery Vision', 100, 670)
                // .text('+0 (000) 123-4567 | hello@email.com', 200, 670);

            doc.end();
            return filePath;
        };

        const sendEmailWithPDF = async (invoice, type) => {
            let pdfPath;
            if (invoice.currency === 'INR' || invoice.currency === 'INR0') {
                pdfPath = createINRPDF(invoice, type);
            } else if (invoice.currency === 'USD') {
                pdfPath = createUSDPDF(invoice, type);
            }

            const mailOptions = {
                from: 'galleryvision24@gmail.com',
                to: invoice.licensorEmail,
                subject: `Paid ${type.charAt(0).toUpperCase() + type.slice(1)} Invoice`,
                text: `Please find the attached paid ${type} invoice.`,
                attachments: [
                    {
                        filename: `${type}_invoice_${invoice._id}.pdf`,
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

        // Send emails with INR invoices
        for (const invoice of paidChannelInvoices) {
            await sendEmailWithPDF(invoice, 'channel');
        }

        for (const invoice of paidMusicInvoices) {
            await sendEmailWithPDF(invoice, 'music');
        }

        console.log('Invoices processed and emails sent successfully.');
        res.status(200).json({ success: true, message: 'Invoices processed and emails sent successfully.' });
    } catch (error) {
        console.error('Error processing invoices and sending emails:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

