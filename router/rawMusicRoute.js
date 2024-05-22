//musicRoute
const express = require("express");
const musicRouter = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const xlsx = require('xlsx');
const rawMusicController = require('../controller/rawMusicController');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload');
    },
    filename: (req, file, cb) => {
        cb(null, 'music1.xlsx');
    }
});

const upload = multer({ 
    storage: storage,
    // Overwrite existing file
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});

// Route to import music

async function convertToCSV(req, res, next) {
    try {
        const xlsxFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'music1.xlsx');
        const csvFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'music1.csv');
        
        const workbook = xlsx.readFile(xlsxFilePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        const csvData = xlsx.utils.sheet_to_csv(sheet);
        
        await fs.writeFile(csvFilePath, csvData);
        
        await fs.unlink(xlsxFilePath);
        
        req.file.filename = 'music1.csv';
        req.file.path = csvFilePath;
        
        next();
    } catch (error) {
        console.error("Error converting XLSX to CSV:", error);
        res.status(500).json({ error: "Error converting XLSX to CSV" });
    }
}
musicRouter.post('/importMusic', upload.single('file'), convertToCSV, rawMusicController.importMusic);
module.exports = musicRouter;
