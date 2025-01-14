// const express = require("express");
// const reportRouter = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs').promises;
// const xlsx = require('xlsx');
// const reportController = require('../controller/reportController');

// // Multer storage configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/upload');
//     },
//     filename: (req, file, cb) => {
//         cb(null, 'report1.xlsx');
//     }
// });

// const upload = multer({ 
//     storage: storage,
//     // Overwrite existing file
//     fileFilter: (req, file, cb) => {
//         cb(null, true);
//     }
// });

// // Route to import music

// async function convertToCSV(req, res, next) {
//     try {
//         const xlsxFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'report1.xlsx');
//         const csvFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'report1.csv');
        
//         const workbook = xlsx.readFile(xlsxFilePath);
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
        
//         const csvData = xlsx.utils.sheet_to_csv(sheet);
        
//         await fs.writeFile(csvFilePath, csvData);
        
//         await fs.unlink(xlsxFilePath);
        
//         req.file.filename = 'report1.csv';
//         req.file.path = csvFilePath;
        
//         next();
//     } catch (error) {
//         console.error("Error converting XLSX to CSV:", error);
//         res.status(500).json({ error: "Error converting XLSX to CSV" });
//     }
// }
// reportRouter.post('/importReport', upload.single('file'), convertToCSV, reportController.importReport);
// module.exports = reportRouter;







const express = require("express");
const reportRouter = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const xlsx = require('xlsx');
const reportController = require('../controller/reportController');
const fileLog = require("../database/model/fileLog");

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload');
    },
    filename: (req, file, cb) => {
        cb(null, 'report1.xlsx');
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || path.extname(file.originalname).toLowerCase() === '.xlsx') {
        cb(null, true);
    } else {
        cb(new Error('Only XLSX files are allowed!'), false);
        console.log("Uploaded Report file format is not valid!");
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});

// Function to convert XLSX to CSV
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

        console.log('Music Upload File:', req.file.filename); 
        
        // Get current time in IST
        const now = new Date();
        const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
        const istTimeString = istTime.toLocaleString('en-IN', { hour12: true });

        // Log file details
        const logEntry = new fileLog({
            fileName: req.file.originalname,
            fileType: 'Payment Report',
            dateTime: istTimeString,
            status: 'Uploaded successfully'
        });
        
        await logEntry.save();
        
        next();
    } catch (error) {
        console.error("Error converting XLSX to CSV:", error);
        res.status(500).json({ error: "Error converting XLSX to CSV" });
    }
}

// Route to import report
reportRouter.post('/importReport', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, convertToCSV, reportController.importReport);

module.exports = reportRouter;
