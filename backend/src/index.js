
// backend/src/index.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
// Import both fs and fs.promises
const fs = require('fs');
const fsPromises = require('fs').promises;
const csv = require('csv-writer').createObjectCsvWriter;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route for root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Email Validation API is running' });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Email validation function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    email,
    isValid: emailRegex.test(email),
    reason: emailRegex.test(email) ? 'Valid email' : 'Invalid email format'
  };
};

app.post('/api/validate', upload.single('file'), async (req, res) => {
  console.log('Received request at /api/validate');
  console.log('Request file:', req.file);

  try {
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const fileContent = await fsPromises.readFile(req.file.path, 'utf8');
    console.log('File content length:', fileContent.length);

    const emails = fileContent
      .split(/[\n,]/)
      .map(email => email.trim())
      .filter(Boolean);

    console.log('Number of emails found:', emails.length);

    const results = emails.map(email => validateEmail(email));

    // Filter valid emails
    const validEmails = results
      .filter(result => result.isValid)
      .map(result => ({
        email: result.email
      }));

    // Create a CSV file with valid emails
    const csvWriter = csv({
      path: 'valid_emails.csv',
      header: [
        {id: 'email', title: 'Email'}
      ]
    });

    await csvWriter.writeRecords(validEmails);

    // Clean up uploaded file
    await fsPromises.unlink(req.file.path);

    console.log('Validation complete, sending response');
    return res.json({
      success: true,
      results,
      hasValidEmails: validEmails.length > 0
    });

  } catch (error) {
    console.error('Error processing file:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process file'
    });
  }
});

// Add download endpoint
app.get('/api/download', (req, res) => {
  const file = 'valid_emails.csv';
  res.download(file);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the API at http://localhost:${PORT}/api/test`);
});
