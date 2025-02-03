const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimiterMiddleware = require('../middleware/rateLimiter');
const emailValidationController = require('../controllers/emailValidation');

// Validation middleware
const validateRequest = [
  body('emails').isArray().withMessage('Emails must be provided as an array'),
  body('emails.*').isString().withMessage('Each email must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Email validation endpoint
router.post('/validate', 
  rateLimiterMiddleware,
  validateRequest,
  emailValidationController.validateEmails.bind(emailValidationController)
);

module.exports = router;