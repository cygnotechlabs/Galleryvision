require('dotenv').config()
const users = require('../database/model/userSchema')
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

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
            return res.status(401).send('User not found');
        }

        // Match the password
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create JWT token
            const token = jwt.sign(
                { id: user._id },
                'abcd', // JWT secret
                {
                    expiresIn: "12h"
                }
            );

            // Set token and remove password from response
            user.token = token;
            user.password = undefined;

            // Cookie options
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            // Send response with cookie
            res.status(200)
                .cookie("token", token, options)
                .json({
                    success: true,
                    token,
                    user
                });

            // Redirect to the home page
            //redirectURL: '/home'
            //res.redirect('/'); // Adjust the path as necessary
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};