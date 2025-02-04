// frontend/src/features/emailVerification/services/validationService.js
// class ValidationService {
//     constructor(baseURL = 'http://localhost:5000/api') {
//       this.baseURL = baseURL;
//     }
  
//     async validateEmails(emails, onProgress) {
//       const response = await fetch(`${this.baseURL}/validate`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ emails })
//       });
  
//       if (!response.ok) {
//         if (response.status === 429) {
//           const error = await response.json();
//           throw new Error(`Rate limit exceeded. Try again in ${error.retryAfter} seconds`);
//         }
//         throw new Error('Validation request failed');
//       }
  
//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();
  
//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
  
//         const chunk = decoder.decode(value);
//         const events = chunk.split('\n\n');
  
//         for (const event of events) {
//           if (event.startsWith('data: ')) {
//             const data = JSON.parse(event.slice(6));
//             onProgress(data);
//           }
//         }
//       }
//     }
//   }
  
//   export default new ValidationService();


class ValidationService {
    constructor(baseURL = '/api') {
      this.baseURL = baseURL;
    }
  
    async validateEmails(emails, onProgress) {
      const response = await fetch(`${this.baseURL}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails })
      });
  
      if (!response.ok) {
        if (response.status === 429) {
          const error = await response.json();
          throw new Error(`Rate limit exceeded. Try again in ${error.retryAfter} seconds`);
        }
        throw new Error('Validation request failed');
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        const chunk = decoder.decode(value);
        const events = chunk.split('\n\n');
  
        for (const event of events) {
          if (event.startsWith('data: ')) {
            const data = JSON.parse(event.slice(6));
            onProgress(data);
          }
        }
      }
    }
  }
  
  export default new ValidationService();
