const users = require('../database/model/userSchema')
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');











//test thaha



// const channelInvoiceModel = require('../database/model/channelInvoice');
// const musicInvoiceModel = require('../database/model/musicInvoice');
// const fs = require('fs');
// const PDFDocument = require('pdfkit');
// const nodemailer = require('nodemailer');
// const { createCanvas, loadImage } = require('canvas');
// const path = require('path');

// const populateGhostImage = async (invoice, ghostImagePath) => {
//     const canvas = createCanvas(600, 800); // Adjust the size as needed
//     const context = canvas.getContext('2d');

//     const image = await loadImage(ghostImagePath);
//     context.drawImage(image, 0, 0);

//     // Define positions and draw text on the canvas
//     const positions = {
//         partnerName: { x: 150, y: 130 },
//         licensorContact: { x: 450, y: 130 },
//         youtubeChannelRevenue: { x: 350, y: 170 },
//         tax: { x: 350, y: 190 },
//         revenueAfterTax: { x: 350, y: 210 },
//         commissionPercentage: { x: 350, y: 250 },
//         commissionAmount: { x: 350, y: 270 },
//         totalPayoutUSD: { x: 350, y: 310 },
//         conversionRate: { x: 350, y: 350 },
//         payoutINR: { x: 350, y: 370 },
//     };

//     const drawText = (text, x, y) => {
//         context.font = '12px Arial';
//         context.fillText(text, x, y);
//     };

//     drawText(invoice.partnerName, positions.partnerName.x, positions.partnerName.y);
//     drawText(invoice.licensorName, positions.licensorContact.x, positions.licensorContact.y);
//     drawText(`$${invoice.ptRevenue}`, positions.youtubeChannelRevenue.x, positions.youtubeChannelRevenue.y);
//     drawText(`$${invoice.tax}`, positions.tax.x, positions.tax.y);
//     drawText(`$${invoice.ptAfterTax}`, positions.revenueAfterTax.x, positions.revenueAfterTax.y);
//     drawText(`${invoice.commissionPercentage}%`, positions.commissionPercentage.x, positions.commissionPercentage.y);
//     drawText(`$${invoice.commissionAmount}`, positions.commissionAmount.x, positions.commissionAmount.y);
//     drawText(`$${invoice.totalPayout}`, positions.totalPayoutUSD.x, positions.totalPayoutUSD.y);
//     drawText(invoice.conversionRate, positions.conversionRate.x, positions.conversionRate.y);
//     drawText(`INR ${invoice.payout}`, positions.payoutINR.x, positions.payoutINR.y);

//     const outputPath = path.join(__dirname, `populated_ghost_image_${invoice._id}.png`);
//     const out = fs.createWriteStream(outputPath);
//     const stream = canvas.createPNGStream();
//     stream.pipe(out);

//     return new Promise((resolve, reject) => {
//         out.on('finish', () => resolve(outputPath));
//         out.on('error', reject);
//     });
// };

// const convertImageToPDF = (imagePath, pdfPath) => {
//     return new Promise((resolve, reject) => {
//         const doc = new PDFDocument({ size: 'A4', margin: 50 });

//         doc.pipe(fs.createWriteStream(pdfPath));
//         doc.image(imagePath, {
//             fit: [500, 400],
//             align: 'center',
//             valign: 'center'
//         });
//         doc.end();

//         doc.on('finish', () => resolve(pdfPath));
//         doc.on('error', reject);
//     });
// };

// const sendEmailWithAttachment = async (filePath, recipientEmail, subject, body) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'galleryvision24@gmail.com',
//             pass: 'cles pbrx btua qvbc',
//         },
//     });

//     const mailOptions = {
//         from: 'galleryvision24@gmail.com',
//         to: recipientEmail,
//         subject: subject,
//         text: body,
//         attachments: [
//             {
//                 filename: path.basename(filePath),
//                 path: filePath,
//             },
//         ],
//     };

//     return transporter.sendMail(mailOptions);
// };

// exports.processInvoicesAndSendEmails = async (req, res) => {
//     try {
//         const paidChannelInvoices = await channelInvoiceModel.find({ status: 'paid' });
//         const paidMusicInvoices = await musicInvoiceModel.find({ status: 'paid' });

//         const ghostImagePath = path.join(__dirname, 'ghost.png'); 

//         for (const invoice of paidChannelInvoices) {
//             const populatedImagePath = await populateGhostImage(invoice, ghostImagePath);
//             const pdfPath = path.join(__dirname, `channel_invoice_${invoice._id}.pdf`);
//             await convertImageToPDF(populatedImagePath, pdfPath);
//             await sendEmailWithAttachment(pdfPath, invoice.licensorEmail, 'Paid Channel Invoice', 'Please find the attached paid channel invoice.');
//         }

//         for (const invoice of paidMusicInvoices) {
//             const populatedImagePath = await populateGhostImage(invoice, ghostImagePath);
//             const pdfPath = path.join(__dirname, `music_invoice_${invoice._id}.pdf`);
//             await convertImageToPDF(populatedImagePath, pdfPath);
//             await sendEmailWithAttachment(pdfPath, invoice.licensorEmail, 'Paid Music Invoice', 'Please find the attached paid music invoice.');
//         }

//         console.log('Invoices processed and emails sent successfully.');
//         res.status(200).json({ success: true, message: 'Invoices processed and emails sent successfully.' });
//     } catch (error) {
//         console.error('Error processing invoices and sending emails:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };




//test thahah





const otpCache = new NodeCache({ stdTTL: 180 }); //180 seconds

const app = express();
app.use(cookieParser())

exports.register = async (req, res) => {
    try {
         const {email, password} = req.body

         if(!(email && password))
            {
                res.status(400).send('email and password required')
            }

         const existingUser = await users.findOne({email})
         if(existingUser) {
             res.status(401).send('User already Exists')
         }

         const encryptPassword = await bcrypt.hash(password, 10)

         const user = await users.create({
            email,
            password: encryptPassword

         })

         //generate a token for user and send it

         const token = jwt.sign(
            {id: user._id,password},
            'abcd', //jwt secret
            {
                expiresIn: "12h"
            }
         );

         user.token = token
         user.password = undefined

         res.status(201).json(user)

    }
    catch (error) {
        console.log(error)
    }
}



exports.login = async (req, res) => {
    try {
        // Get all data 
        console.log(req.body);
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).send('Send all data');
        }
        

        // Find the user
        const user = await users.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(401).send('User not found!');   
        }

        // Match the password
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create JWT token
            // const token = jwt.sign(
            //     { id: user._id },
            //     'abcd', // JWT secret
            //     {
            //         expiresIn: "12h"
            //     }
            // );

            // Set token and remove password from response
            // user.token = token;
            user.password = undefined;

            // Cookie options
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            // Send response with cookie
            res.status(200)
                // .cookie("token", token, options)
                .json({
                    success: true,
                    // token,
                    user
                });

            // Redirect to the home page
            //redirectURL: '/home'
            //res.redirect('/'); // Adjust the path as necessary
        } else {
            res.status(401).send('Invalid Password!');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};


// Nodemailer transporter setup using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GALLERYVISION_EMAIL,
        pass: process.env.GALLERYVISION_PASSWORD
    }
});

// Function to send OTP email
const sendOtpEmail = (email, otp) => {
    const mailOptions = {
        from: process.env.GALLERYVISION_EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your One-Time Password (OTP) code is: ${otp}

        This code is valid for only 2 minutes, so use it promptly to ensure secure access.`
    };

    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
            return false;
        } else {
            console.log('Email sent:', info.response);
            return true;
        }
    });
};


exports.loginTest = async (req, res) => {
  try {
      // Get all data
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
          return res.status(400).send('Send all data');
      }

      // Find the user
      const user = await users.findOne({ email });

      // Check if user exists
      if (!user) {
          return res.status(401).send('User not found!');
      }

      // Match the password
      if (user && (await bcrypt.compare(password, user.password))) {
          // Generate OTP
          const otp = Math.floor(100000 + Math.random() * 900000).toString();

          // Store OTP in cache with the email as the key
          otpCache.set(email, otp);
        
          // Send OTP email
          await sendOtpEmail(user.email, otp);

          res.status(200).json({
              success: true,
              message: 'OTP sent to email'
          });
      } else {
          res.status(401).send('Invalid Password!');
      }
  } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
  }
};

exports.verifyOtp = async (req, res) => {
  try {
      const { email, otp } = req.body;
    console.log(email,otp);
      // Validate input
      if (!otp) {
          return res.status(400).send('Send all data');
      }

      // Find the user
      const user = await users.findOne({ email });

      // Check if user exists
      if (!user) {
          return res.status(401).send('User not found!');
      }

      // Get OTP from cache
      const cachedOtp = otpCache.get(email);
      // const cachedOtp = otpCache
      console.log(` cashed otp : ${cachedOtp}, typed otp : ${otp}`);
      // Check if OTP matches and is not expired
      if (cachedOtp && cachedOtp === otp) {
          // Create JWT token
          const token = jwt.sign(
              { id: user._id },
              'abcd', // JWT secret
              {
                  expiresIn: "12h"
              }
          );

          // Remove sensitive data from response
          user.token = token;
          user.password = undefined;

          // Cookie options
          const options = {
              expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //3 days
              httpOnly: true
          };

          // Send response with cookie
          res.status(200)
          .json({
              success: true,
              token: "Bearer" + token, // Prepend "Bearer " to the token
              user: user
          });

          // Invalidate the OTP after successful verification
          otpCache.del(email);
      } else {
          res.status(401).send('Invalid or expired OTP!');
      }
  } catch (error) {
      console.log('Error in verifyOtp:', error);
      res.status(500).send('Internal Server Error');
  }
};  