//musicRoute
const express = require("express");
const reportRouter = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const xlsx = require('xlsx');
const reportController = require('../controller/reportController');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload');
    },
    filename: (req, file, cb) => {
        cb(null, 'report1.xlsx');
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
        const xlsxFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'report1.xlsx');
        const csvFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'report1.csv');
        
        const workbook = xlsx.readFile(xlsxFilePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        const csvData = xlsx.utils.sheet_to_csv(sheet);
        
        await fs.writeFile(csvFilePath, csvData);
        
        await fs.unlink(xlsxFilePath);
        
        req.file.filename = 'report1.csv';
        req.file.path = csvFilePath;
        
        next();
    } catch (error) {
        console.error("Error converting XLSX to CSV:", error);
        res.status(500).json({ error: "Error converting XLSX to CSV" });
    }
}
reportRouter.post('/importReport', upload.single('file'), convertToCSV, reportController.importReport);
module.exports = reportRouter;
