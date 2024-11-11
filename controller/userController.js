const users = require('../database/model/userSchema');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');









const otpCache = new NodeCache({ stdTTL: 180 }); //180 seconds

const app = express();
app.use(cookieParser())

exports.register = async (req, res) => {
    try {
         const {email, password} = req.body

         if(!(email && password))
            {
                res.status(400).send('Email and password required')
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
            'galleryVision24',
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
        from: `"Gallery Vision Verification" <${process.env.GALLERYVISION_EMAIL}>`,
        to: email,
        subject: 'Account Software OTP',
        text: `Hey there,

Your One-Time Password (OTP) is: ${otp}

This code is valid for 2 minutes. Please use it promptly to ensure secure access.

Thanks for using our service!

Cheers,
Gallery Vision Team`
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


exports.login = async (req, res) => {
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
          sendOtpEmail(user.email, otp);

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