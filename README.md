# Google Sheets Uploader

![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Deployed](https://img.shields.io/badge/Deployed-Netlify-blueviolet)

## 🚀 About the Project

A web-based application that allows users to upload an Excel file (`.xlsx` or `.xls`) and automatically update the contents of a Google Sheet in one step.

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png" alt="Google Sheets Logo" width="150">
</p>

## ✨ Features

- **File Upload:** Upload an Excel file (`.xlsx` or `.xls`) via a simple web interface.
- **Google Sheets Integration:** The uploaded file replaces the content of a specified Google Sheet.
- **Automated Workflow:** Streamlines the process of updating Google Sheets with new data.
- **Serverless Backend:** Uses Netlify Functions to handle file processing and API interactions.

## 📸 Screenshots

| Upload Form | Updated Google Sheet |
|------------|---------------------|
| ![Upload Form]([./screenshots/upload-form.png](https://private-user-images.githubusercontent.com/98593403/415210025-dee5083e-e2b5-49cf-8f57-a6eea54f3bc1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDAwNjA1NjAsIm5iZiI6MTc0MDA2MDI2MCwicGF0aCI6Ii85ODU5MzQwMy80MTUyMTAwMjUtZGVlNTA4M2UtZTJiNS00OWNmLThmNTctYTZlZWE1NGYzYmMxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMjAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjIwVDE0MDQyMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTA4YWI3MTM2Y2EwOTEwNDM1YTNhYjExNzFjNTMyNDY4MWQ2NmYxNzA3MzIwMzg4MTczNTgwN2JlZTUwOTJkYmImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.NWYvOLB3GbjpD40CAJJVgSOtYyO8_sThb9nkJ_3ZtnY)) | ![Updated Google Sheet](./screenshots/google-sheet.png) |

## 🛠 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/google-sheets-uploader.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables by creating a `.env` file:
   ```sh
   GOOGLE_PRIVATE_KEY="your-private-key"
   GOOGLE_CLIENT_EMAIL="your-client-email"
   SPREADSHEET_ID="your-google-sheet-id"
   ```
4. Run locally:
   ```sh
   npm start
   ```

## 🎯 Usage

1. Open the web page in your browser.
2. Click the **Choose File** button and select an Excel file (`.xlsx` or `.xls`).
3. Click **Upload**.
4. The app will process the file and replace the contents of the specified Google Sheet.

## 🌍 Deployment

This application is designed to be deployed on [Netlify](https://www.netlify.com/) using serverless functions.

### Steps:

1. Push your code to a GitHub repository.
2. Connect your repository to Netlify.
3. Configure the build settings:
   - **Build Command:** `npm install`
   - **Publish Directory:** `public`
4. Set environment variables in Netlify for:
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_CLIENT_EMAIL`
   - `SPREADSHEET_ID`
5. Deploy and test the live site.

## 🛠 Built With ❤️ Using

- [Express.js](https://expressjs.com/) - Backend framework.
- [Multer](https://www.npmjs.com/package/multer) - Middleware for handling file uploads.
- [XLSX](https://www.npmjs.com/package/xlsx) - Library for parsing Excel files.
- [Google APIs Node.js Client](https://github.com/googleapis/google-api-nodejs-client) - Interacts with the Google Sheets API.

## ⚠️ Limitations

- **File Size:** Maximum ~4 MB due to Netlify's request size limit.
- **Execution Time:** Netlify Functions have a max execution time of 10-15 seconds.
- **Google Sheets API Limits:** Ensure your Google Sheet does not exceed **5 million** total cells.

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature
   ```
5. Open a pull request.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

&copy; 2025 Google Sheets Uploader. All rights reserved.

