// backend/src/middleware/rateLimiter.js
const rateLimiter = require('../services/rateLimiter');

const rateLimiterMiddleware = (req, res, next) => {
  const clientId = req.ip;
  
  if (!rateLimiter.isAllowed(clientId)) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      remainingRequests: rateLimiter.getRemainingRequests(clientId),
      retryAfter: rateLimiter.timeWindow / 1000
    });
  }
  
  next();
};

module.exports = rateLimiterMiddleware;
