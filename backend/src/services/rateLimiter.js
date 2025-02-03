// backend/src/services/rateLimiter.js
class RateLimiter {
    constructor(maxRequests = 100, timeWindow = 60000) {
      this.requests = new Map();
      this.maxRequests = maxRequests;
      this.timeWindow = timeWindow;
    }
  
    isAllowed(clientId) {
      const now = Date.now();
      const clientRequests = this.requests.get(clientId) || [];
      
      // Remove expired timestamps
      const validRequests = clientRequests.filter(
        timestamp => now - timestamp < this.timeWindow
      );
      
      if (validRequests.length >= this.maxRequests) {
        return false;
      }
      
      validRequests.push(now);
      this.requests.set(clientId, validRequests);
      return true;
    }
  
    getRemainingRequests(clientId) {
      const now = Date.now();
      const clientRequests = this.requests.get(clientId) || [];
      const validRequests = clientRequests.filter(
        timestamp => now - timestamp < this.timeWindow
      );
      
      return this.maxRequests - validRequests.length;
    }
  }
  
  module.exports = new RateLimiter();
  