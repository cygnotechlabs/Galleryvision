
// const express = require("express");
// const musicRouter = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs').promises;
// const xlsx = require('xlsx');
// const rawMusicController = require('../controller/rawMusicController');
// const fileLog = require("../database/model/fileLog");

// // Multer storage configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './public/upload');
//     },
//     filename: (req, file, cb) => {
//         cb(null, 'music1.xlsx');
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || path.extname(file.originalname).toLowerCase() === '.xlsx') {
//         cb(null, true);
//     } else {
//         cb(new Error('Only XLSX files are allowed!'), false);
//         console.log("Uploaded Music file format is not valid!");
//     }
// };

// const upload = multer({ 
//     storage: storage,
//     fileFilter: fileFilter 
// });

// // Function to convert XLSX to CSV
// async function convertToCSV(req, res, next) {
//     try {
//         const xlsxFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'music1.xlsx');
//         const csvFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'music1.csv');
        
//         const workbook = xlsx.readFile(xlsxFilePath);
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
        
//         const csvData = xlsx.utils.sheet_to_csv(sheet);
        
//         await fs.writeFile(csvFilePath, csvData);
//         await fs.unlink(xlsxFilePath);
        
//         req.file.filename = 'music1.csv';
//         req.file.path = csvFilePath;
        
//         console.log('Music Upload File:', req.file.filename); 
        
//         // Get current time in IST
//         const now = new Date();
//         const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
//         const istTimeString = istTime.toLocaleString('en-IN', { hour12: true });

//         // Log file details
//         const logEntry = new fileLog({
//             fileName: req.file.originalname,
//             fileType: 'Music',
//             dateTime: istTimeString,
//             status: 'Uploaded successfully'
//         });
        
//         await logEntry.save();

//         next();
//     } catch (error) {
//         console.error("Error converting XLSX to CSV:", error);
//         res.status(500).json({ error: "Error converting XLSX to CSV" });
//     }
// }

// // Route to import music
// musicRouter.post('/importMusic', (req, res, next) => {
//     upload.single('file')(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).json({ message: err.message });
//         } else if (err) {
//             return res.status(400).json({ message: err.message });
//         }

//         if (req.file) {
//             console.log('Uploaded file original name:', req.file.originalname); // Log the original filename
//         } else {
//             console.log('No file uploaded');
//         }
//         next();
//     });
// }, convertToCSV, rawMusicController.importMusic);

// module.exports = musicRouter;

























const express = require("express");
const musicRouter = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const ExcelJS = require('exceljs');  // Use exceljs instead of xlsx
const rawMusicController = require('../controller/rawMusicController');
const fileLog = require("../database/model/fileLog");

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload');
    },
    filename: (req, file, cb) => {
        cb(null, 'music1.xlsx');
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || path.extname(file.originalname).toLowerCase() === '.xlsx') {
        cb(null, true);
    } else {
        cb(new Error('Only XLSX files are allowed!'), false);
        console.log("Uploaded Music file format is not valid!");
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});

// Function to convert XLSX to CSV using exceljs
async function convertToCSV(req, res, next) {
    try {
        const xlsxFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'music1.xlsx');
        const csvFilePath = path.resolve(__dirname, '..', 'public', 'upload', 'music1.csv');
        
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(xlsxFilePath);  // Read the XLSX file with exceljs
        const worksheet = workbook.worksheets[0];  // Access the first sheet

        // Convert worksheet rows to CSV format
        const csvData = [];
        worksheet.eachRow((row, rowNumber) => {
            const rowData = row.values.slice(1).join(',');  // Get row values and convert to CSV
            csvData.push(rowData);
        });

        const csvContent = csvData.join('\n');  // Combine rows into a single CSV content
        
        // Write the CSV file
        await fs.writeFile(csvFilePath, csvContent);
        await fs.unlink(xlsxFilePath);  // Remove the original XLSX file
        
        // Update the request object with the CSV file details
        req.file.filename = 'music1.csv';
        req.file.path = csvFilePath;
        
        console.log('Music Upload File:', req.file.filename); 
        
        // Get current time in IST
        const now = new Date();
        const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
        const istTimeString = istTime.toLocaleString('en-IN', { hour12: true });

        // Log file details in the database
        const logEntry = new fileLog({
            fileName: req.file.originalname,
            fileType: 'Music',
            dateTime: istTimeString,
            status: 'Uploaded successfully'
        });
        
        await logEntry.save();

        next();  // Proceed to the next middleware (rawMusicController.importMusic)
    } catch (error) {
        console.error("Error converting XLSX to CSV:", error);
        res.status(500).json({ error: "Error converting XLSX to CSV" });
    }
}

// Route to import music
musicRouter.post('/importMusic', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }

        if (req.file) {
            console.log('Uploaded file original name:', req.file.originalname); // Log the original filename
        } else {
            console.log('No file uploaded');
        }
        next();  // Proceed to convertToCSV middleware
    });
}, convertToCSV, rawMusicController.importMusic);  // After CSV conversion, import music

module.exports = musicRouter;
