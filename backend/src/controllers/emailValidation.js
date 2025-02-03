
// // backend/src/controllers/emailValidation.js
// const fs = require('fs').promises;
// const multer = require('multer');
// const emailValidationService = require('../services/emailValidation');
// const rateLimiter = require('../services/rateLimiter');
// const batchProcessor = require('../services/batchProcessor');

// const upload = multer({ 
//   dest: 'uploads/',
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// });

// class EmailValidationController {
//   constructor() {
//     this.handleFileUpload = upload.single('file');
//   }

//   async validateEmails(req, res) {
//     const clientId = req.ip;
    
//     if (!rateLimiter.isAllowed(clientId)) {
//       return res.status(429).json({
//         error: 'Rate limit exceeded',
//         remainingRequests: rateLimiter.getRemainingRequests(clientId)
//       });
//     }

//     try {
//       let emails;
      
//       if (req.file) {
//         // Handle file upload
//         const fileContent = await fs.readFile(req.file.path, 'utf8');
//         emails = fileContent.split(/[\n,]/)
//           .map(email => email.trim())
//           .filter(Boolean);
//         await fs.unlink(req.file.path);
//       } else if (req.body.emails && Array.isArray(req.body.emails)) {
//         // Handle JSON payload
//         emails = req.body.emails;
//       } else {
//         return res.status(400).json({ 
//           error: 'Invalid input - provide either file upload or emails array' 
//         });
//       }

//       // Setup SSE
//       res.writeHead(200, {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive'
//       });

//       // Process emails in batches
//       batchProcessor.on('progress', (progress) => {
//         res.write(`data: ${JSON.stringify(progress)}\n\n`);
//       });

//       const results = await batchProcessor.processBatch(
//         emails,
//         email => emailValidationService.validateEmail(email)
//       );

//       res.write(`data: ${JSON.stringify({ complete: true, results })}\n\n`);
//       res.end();
//     } catch (error) {
//       console.error('Validation error:', error);
//       res.status(500).json({ error: 'Validation failed' });
//     }
//   }
// }

// module.exports = new EmailValidationController();

// backend/src/controllers/emailValidation.js
const fs = require('fs').promises;
const emailValidationService = require('../services/emailValidation');

class EmailValidationController {
  async validateEmails(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No file uploaded'
        });
      }

      const fileContent = await fs.readFile(req.file.path, 'utf8');
      const emails = fileContent
        .split(/[\n,]/)
        .map(email => email.trim())
        .filter(Boolean);

      const results = await Promise.all(
        emails.map(async (email) => ({
          email,
          validation: await emailValidationService.validateEmail(email)
        }))
      );

      // Clean up the uploaded file
      await fs.unlink(req.file.path);

      res.json({
        success: true,
        results: results
      });
    } catch (error) {
      console.error('Validation error:', error);
      res.status(500).json({
        success: false,
        error: 'Email validation failed'
      });
    }
  }
}

module.exports = new EmailValidationController();
