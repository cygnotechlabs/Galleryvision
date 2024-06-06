const channelInvoiceModel = require('../database/model/channelInvoice');
const musicInvoiceModel = require('../database/model/musicInvoice');
const csv = require('csvtojson');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

// exports.processInvoicesAndSendEmails = async (req, res) => {
//     try {
//         const paidChannelInvoices = await channelInvoiceModel.find({ status: 'paid' });
//         const paidMusicInvoices = await musicInvoiceModel.find({ status: 'paid' });

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'galleryvision24@gmail.com',
//                 pass: 'cles pbrx btua qvbc',
//             },
//         });

//         const createPDF = (invoice, type) => {
//             const doc = new PDFDocument({ size: 'A4', margin: 50 });
//             const fileName = `${type}_invoice_${invoice._id}.pdf`;
//             const filePath = `./${fileName}`;

//             doc.pipe(fs.createWriteStream(filePath));

//             // Add header
//             doc
//                 .image('public/upload/gv-logo.png', 50, 30, { width: 100 })
//                 .fontSize(20)
//                 // .text('Gallery Vision', 110, 40)
//                 .fontSize(10)
//                 .text('Partner Revenue Report', 350, 40, { align: 'right' })
//                 .text('April 2024', 450, 55, { align: 'right' });

//             doc
//                 .moveTo(50, 70)
//                 .lineTo(550, 70)
//                 .stroke();

//             // Add invoice details
//             doc
//                 .fontSize(12)
//                 .text(`Partner name: ${invoice.partnerName}`, 50, 90)
//                 .text(`Licensor contact: ${invoice.licensorName}`, 50, 110);

//             doc
//                 .moveTo(50, 130)
//                 .lineTo(550, 130)
//                 .stroke();

//             // Revenue section
//             doc
//                 .fontSize(12)
//                 .text('Total Revenue (in USD)', 50, 150)
//                 .fontSize(10)
//                 .text(`YouTube Channel Revenue:`, 50, 170)
//                 .text(`$${invoice.ptRevenue}`, 250, 170, { align: 'right' })
//                 .text(`Tax:`, 50, 190)
//                 .text(`$${invoice.tax}`, 250, 190, { align: 'right' })
//                 .text(`YouTube Channel Revenue (After tax):`, 50, 210)
//                 .text(`$${invoice.ptAfterTax}`, 250, 210, { align: 'right' });

//             doc
//                 .moveTo(50, 230)
//                 .lineTo(550, 230)
//                 .stroke();

//             // Commission section
//             doc
//                 .fontSize(12)
//                 .text('Commission (in percentage)', 50, 250)
//                 .fontSize(10)
//                 .text(`Commission amount:`, 50, 270)
//                 .text(`$${invoice.commissionAmount}`, 250, 270, { align: 'right' });

//             doc
//                 .moveTo(50, 290)
//                 .lineTo(550, 290)
//                 .stroke();

//             // Total Payout section
//             doc
//                 .fontSize(12)
//                 .text('Total Payout (in USD)', 50, 310)
//                 .fontSize(10)
//                 .text(`$${invoice.totalPayout}`, 250, 310, { align: 'right' });

//             doc
//                 .moveTo(50, 330)
//                 .lineTo(550, 330)
//                 .stroke();

//             // Conversion rate section
//             doc
//                 .fontSize(12)
//                 .text('Conversion rate (in INR)', 50, 350)
//                 .fontSize(10)
//                 .text(`Payout (April Payout in INR):`, 50, 370)
//                 .text(`INR ${invoice.payout}`, 250, 370, { align: 'right' });

//             doc
//                 .moveTo(50, 390)
//                 .lineTo(550, 390)
//                 .stroke();

//             // Footer
//             doc
//                 .fontSize(10)
//                 .text(
//                     'Note: Lorem ipsum dolor sit amet consectetur. Id cras semper nulla amet hac urna sem. Ac accumsan faucibus gravida consequat arcu dui risus. Eget vitae senectus ultricies velit adipiscing',
//                     50,
//                     420,
//                     { align: 'center', width: 500 }
//                 );

//             doc
//                 .moveTo(50, 460)
//                 .lineTo(550, 460)
//                 .stroke();

//             doc
//                 .fontSize(10)
//                 .text('Gallery Vision', 50, 470, { align: 'left' })
//                 .text('+0 (000) 123-4567 | hello@email.com', 50, 480, { align: 'left' });

//             doc.end();
//             return filePath;
//         };

//         const sendEmailWithPDF = async (invoice, type) => {
//             const pdfPath = createPDF(invoice, type);

//             const mailOptions = {
//                 from: 'galleryvision24@gmail.com',
//                 to: invoice.licensorEmail,
//                 subject: `Paid ${type.charAt(0).toUpperCase() + type.slice(1)} Invoice`,
//                 text: `Please find the attached paid ${type} invoice.`,
//                 attachments: [
//                     {
//                         filename: `${type}_invoice_${invoice._id}.pdf`,
//                         path: pdfPath,
//                     },
//                 ],
//             };

//             await transporter.sendMail(mailOptions);

//             // Delete the PDF file after sending the email
//             fs.unlink(pdfPath, (err) => {
//                 if (err) {
//                     console.error(`Failed to delete file: ${pdfPath}`, err);
//                 } else {
//                     console.log(`File deleted: ${pdfPath}`);
//                 }
//             });
//         };

//         for (const invoice of paidChannelInvoices) {
//             await sendEmailWithPDF(invoice, 'channel');
//         }

//         for (const invoice of paidMusicInvoices) {
//             await sendEmailWithPDF(invoice, 'music');
//         }

//         console.log('Invoices processed and emails sent successfully.');
//         res.status(200).json({ success: true, message: 'Invoices processed and emails sent successfully.' });
//     } catch (error) {
//         console.error('Error processing invoices and sending emails:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };


// // new html design amal
// const channelInvoiceModel = require('../database/model/channelInvoice');
// const musicInvoiceModel = require('../database/model/musicInvoice');
// const nodemailer = require('nodemailer');
// const fs = require('fs');
const puppeteer = require('puppeteer');

const path = require('path');

const readFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

exports.processInvoicesAndSendEmails = async (req, res) => {
    try {
        const paidChannelInvoices = await channelInvoiceModel.find({ status: 'paid' });
        const paidMusicInvoices = await musicInvoiceModel.find({ status: 'paid' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'galleryvision24@gmail.com',
                pass: 'cles pbrx btua qvbc',
            },
        });

        const createPDF = async (invoice, type) => {
            const htmlTemplatePath = path.join(__dirname, 'invoiceTemplate.html');
            let htmlContent = await readFile(htmlTemplatePath);

            htmlContent = htmlContent
                .replace('{{partnerName}}', invoice.partnerName)
                .replace('{{licensorName}}', invoice.licensorName)
                .replace('{{ptRevenue}}', invoice.ptRevenue)
                .replace('{{tax}}', invoice.tax)
                .replace('{{ptAfterTax}}', invoice.ptAfterTax)
                .replace('{{commissionAmount}}', invoice.commissionAmount)
                .replace('{{totalPayout}}', invoice.totalPayout)
                .replace('{{payout}}', invoice.payout);

                htmlContent += `
        <style>
            /* Additional styling */
            .content {
                background-color: aquamarine;
                padding: 20px;
            }
            .content p {
                color: #333;
            }
            .content-section1{
                display: flex;
                justify-content: space-between;
                border-radius: 20px;
                background-color: aquamarine !important;
                padding: 5px 10px;
            }
        </style>
    `;
                
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(htmlContent);
            const fileName = `${type}_invoice_${invoice._id}.pdf`;
            const filePath = path.join(__dirname, fileName);
            await page.pdf({ path: filePath, format: 'A4' });
            await browser.close();

            return filePath;
        };

        const sendEmailWithPDF = async (invoice, type) => {
            const pdfPath = await createPDF(invoice, type);

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

            // Delete the PDF file after sending the email
            fs.unlink(pdfPath, (err) => {
                if (err) {
                    console.error(`Failed to delete file: ${pdfPath}`, err);
                } else {
                    console.log(`File deleted: ${pdfPath}`);
                }
            });
        };

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

// // new html design amal