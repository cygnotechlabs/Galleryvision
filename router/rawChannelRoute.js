const express = require("express");
const user = express();
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

user.use(bodyParser.urlencoded({ extended: true }));
user.use(express.static(path.resolve(__dirname, 'public')));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload')
    },
    filename: (req, file, cb) => {
        cb(null, 'channel1.csv');
    }
});

var upload = multer({ storage: storage });

const rawChannelController = require('../controller/rawChannelController');

function deleteExistingFile(req, res, next) {
    const filePath = path.resolve(__dirname, 'public', 'upload', 'channel1.csv');
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error deleting existing file:", err);
                    return res.status(500).send("Error deleting existing file");
                }
                next();
            });
        } else {
            next();
        }
    });
}

user.post('/importChannel', deleteExistingFile, upload.single('file'), rawChannelController.importChannel);

module.exports = user;
