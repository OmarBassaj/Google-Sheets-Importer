const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Load Google API credentials
const credentials = require('./credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const spreadsheetId = '1WYmQvDvfZGxzAaeYE2uj40hndZIb8C9fDx443e5huN8'; // Your Google Sheet ID

// Authenticate with Google Sheets API
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

// Serve static files (frontend)
app.use(express.static('public'));

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const filePath = req.file.path;

        // Read the Excel file
        let workbook;
        try {
            workbook = xlsx.readFile(filePath);
        } catch (err) {
            fs.unlinkSync(filePath); // Clean up invalid file
            return res.status(400).json({ message: 'Invalid Excel file.' });
        }

        // Extract data from the first sheet
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
            fs.unlinkSync(filePath); // Clean up empty file
            return res.status(400).json({ message: 'Excel file contains no sheets.' });
        }

        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        // Clear existing data in the Google Sheet
        await sheets.spreadsheets.values.clear({
            spreadsheetId,
            range: 'A:Z', // Adjust range as needed
        });

        // Write new data to the Google Sheet
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'A1', // Start writing from cell A1
            valueInputOption: 'RAW',
            resource: { values: sheetData },
        });

        // Clean up uploaded file
        fs.unlinkSync(filePath);

        res.json({ message: 'File uploaded and Google Sheet updated successfully!' });
    } catch (error) {
        console.error('Error details:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ message: 'An error occurred while processing the file.' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});