// // backend/src/services/emailValidation.js

// const dns = require('dns');

// class EmailValidationService {
//     constructor() {
//       this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       this.disposableDomains = new Set([
//         // Temporary email services
//         "temp-mail.org",
//         "tempmail.com",
//         "guerrillamail.com",
//         "mailinator.com",
//         "yopmail.com",
//         "throwawaymail.com",
//         "10minutemail.com",
//         "fakeinbox.com",
//         "spamgourmet.com",
        
//         // Disposable domain providers
//         "dispostable.com",
//         "trashmail.com",
//         "sharklasers.com",
//         "spam4.me",
//         "emailtemporar.com",
        
//         // Common pattern domains
//         "temp.email",
//         "disposable.email",
//         "tempmail.net",
//         "throwaway.email",
        
//         // Additional known disposable domains
//         "boximail.com",
//         "dropmail.me",
//         "33mail.com",
//         "getairmail.com",
//         "mailnull.com",
//         "mailshell.com",
//         "spambox.us",
//         "tempemail.net"
//       ]);
//     }
  
//     async validateEmail(email) {
//       try {
//         // Basic format validation
//         if (!this.isValidFormat(email)) {
//           return {
//             isValid: false,
//             reason: 'Invalid email format'
//           };
//         }
  
//         // Check for disposable email
//         const disposableCheck = this.checkDisposable(email);
//         if (disposableCheck.isDisposable) {
//           return {
//             isValid: false,
//             reason: 'Disposable email detected',
//             details: disposableCheck
//           };
//         }
  
//         // Domain MX record validation
//         const domain = email.split('@')[1];
//         const hasMX = await this.checkMXRecord(domain);
        
//         if (!hasMX) {
//           return {
//             isValid: false,
//             reason: 'Invalid domain or no MX records found'
//           };
//         }
  
//         return {
//           isValid: true,
//           reason: 'Email is valid'
//         };
//       } catch (error) {
//         return {
//           isValid: false,
//           reason: 'Validation failed'
//         };
//       }
//     }
  
//     isValidFormat(email) {
//       return this.emailRegex.test(email);
//     }
  
//     checkDisposable(email) {
//       const domain = email.split('@')[1].toLowerCase();
//       const isDisposable = this.disposableDomains.has(domain);
  
//       return {
//         isDisposable,
//         domain,
//         reason: isDisposable ? 'Disposable domain detected' : 'Not a disposable domain'
//       };
//     }
  
//     checkMXRecord(domain) {
//       return new Promise((resolve) => {
//         dns.resolveMx(domain, (error, addresses) => {
//           resolve(!error && addresses && addresses.length > 0);
//         });
//       });
//     }
//   }
  
//   module.exports = new EmailValidationService();


// backend/src/services/emailValidation.js
const dns = require('dns');

class EmailValidationService {
  async validateEmail(email) {
    try {
      // Basic validation
      if (!this.isValidFormat(email)) {
        return {
          isValid: false,
          reason: 'Invalid email format'
        };
      }

      // Domain validation
      const domain = email.split('@')[1];
      const hasMX = await this.checkMXRecord(domain);
      
      if (!hasMX) {
        return {
          isValid: false,
          reason: 'Invalid domain or no MX records found'
        };
      }

      return {
        isValid: true,
        reason: 'Email is valid'
      };
    } catch (error) {
      return {
        isValid: false,
        reason: 'Validation failed'
      };
    }
  }

  isValidFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  checkMXRecord(domain) {
    return new Promise((resolve) => {
      dns.resolveMx(domain, (error, addresses) => {
        resolve(!error && addresses && addresses.length > 0);
      });
    });
  }
}

module.exports = new EmailValidationService();
