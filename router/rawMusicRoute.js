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








// const express = require("express");
// const musicRouter = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs').promises;
// const xlsx = require('xlsx');
// const rawMusicController = require('../controller/rawMusicController');

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
//         next();
//     });
// }, convertToCSV, rawMusicController.importMusic);

// module.exports = musicRouter;
