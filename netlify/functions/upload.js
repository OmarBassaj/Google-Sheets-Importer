const { google } = require('googleapis');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Load Google API credentials
const credentials = {
    type: "service_account",
    project_id: "depo-450110",
    private_key_id: "42b230db9b0ddbe512561a384081f606a1746419",
    private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDJibz/Fm+jZ0w1\nxdRVWT8yWpQEdXEsGpazSMPoXjSzYFKMEEByWylL7CqAdfSiOUy2MlLH+gTxfF2e\nLZFaYKIgEQkk++gG2OvsdYkYvM6nlUIw38p1NRZxS720SNBw5mYl4nSCXUcSKZg/\nMz3vENQCeBVE/K8musQojzCYiBXRhyvH6TTqBqEck5TpMPA99a6jhv+vj0hohQvB\n3xZNiyu0N0eNHXfUlIkyvUQRwkk/ou62q3vHl+skwJw4UP32MTOB7vm37B72bAgZ\nfPyr7+eFykyjJ4xVp2QBNxHNaHLE1P2DE/jswvK8rsJTlYuwp/sW8B19strpgxca\na3jq2PZnAgMBAAECggEAGHKa+J6yIDJRrlw3K7tNzT/roLbWabE4Arua+D8lSXUv\nzknSZ4zjb5BQf5DPgjZNNfTY0eVkYB7kBGImtb3vLNCkOVZNiTcbN23ymYudzfpv\nMxqSprEv7cJwWsRSdL+eOI5F7+J80pk1HMWMh8mUzk/e1KWKYbpaPUlRbc9kRixW\nRYm6T4i3N8sKpdxAR51hon76b1UosCvRCzHCMJmW83RuyjaWbr5uzO/Itxb6vDRm\noX1F927niD6M/L5lWN9ruf54ZIcxvS0rfZxMTg7mbTDh6iW/kEfJyVb0DfRC7jKw\ntjWjKx4XuSEQR8zdvxGXUSLoG+7BnpRPL0N4kIVeUQKBgQDz+G9a/jv+Ho0Bifsj\nQGFTXjk+5Vpp5b4D6KdAsUKrq//5yWnl5jH83oS5L+aJH5ANP0lgWp5peoxTojJ4\n4COgJfb9AQ0kC+DT9yTtATIiBsfmcUhSJSVpf35uchyd057cMygUZEnq5FW1YLm2\nO/8aPuwPbW2BxrhOQ1Vma9tUAwKBgQDTebEdDWBpqFyq6gh09OVmKJ/3Eji7j9W9\nXdyIDu1Bl6kH3e7tqXJG7GKbyr9rROAaycHTqJVUWleqTsf1v+wRJ/1R83yxfEHk\nYPM1pykM6mP/cIvmViPBaOcHBcJuyPjaojd09rB0QnU2p1eQzgHewm8NQ4Hmpk3q\naFtwdaeQzQKBgQDSlfnAiDxOgB5kWq6s4fBgXq95C828JLOceiCMJbWPqzqbaHCB\nIe65/3R+yMrsR5M27A6xHeco0r/3nMSGM6psnPiRsGugVqRtMiHsdaDJYCMCVXwA\nc9HUO1ltihALZ1PzbDDHUT3Ag/E7S09h7m2nQPLP6jugzl/eJh679pNt8wKBgQC6\nDsshQG+fBh3h0d526DAcXYnAGywG+VmYLkik/F0J5KE25rAcMYT1mWx4nT0k54g0\niWYbDquzd3jBwmZzdNQBlClwPMVscmKWyCWzAss/LcmlKCQuF4OF2wHIT+ztA6zO\nzwHzykcdQotV9o04PcevcWm7RbW4dIEAx6gLnbg70QKBgQDArkt+P3Bwcj8heSEZ\nIgIxY116WfPma1y5TT8cxfvd7W/TkVV/pCJomj+j16Pl+438Sy1wMp4m+CqBY4ve\ndYM54eRAiNXIejBZa9qo4WXlLpTlEFLbUQo0EUvR20C7AeHmEliS9IEU2V1mCyhj\n6OgyRhJjMxnV/f/0/tsSkNRvnw==\n-----END PRIVATE KEY-----\n`,
    client_email: "depo-1483@depo-450110.iam.gserviceaccount.com",
    client_id: "117286885748422648723",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/depo-1483%40depo-450110.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
};

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const spreadsheetId = '1ctTMH1WsFQ519RG-FvfzzP0ztMyrF7oeGmm0d6b8RI4'; // Your Google Sheet ID

// Authenticate with Google Sheets API
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
});

const sheets = google.sheets({ version: 'v4', auth });

// Netlify Function Handler
exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const formData = JSON.parse(event.body);
        const fileData = Buffer.from(formData.file, 'base64'); // Decode base64 file data
        const filePath = `/tmp/uploaded-file.xlsx`; // Temporary file path

        // Save the file temporarily
        fs.writeFileSync(filePath, fileData);

        // Read the Excel file
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
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

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File uploaded and Google Sheet updated successfully!' }),
        };
    } catch (error) {
        console.error('Error details:', error.message);
        console.error('Stack trace:', error.stack);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An error occurred while processing the file.' }),
        };
    }
};