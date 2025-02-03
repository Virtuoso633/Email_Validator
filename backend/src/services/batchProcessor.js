// backend/src/services/batchProcessor.js
const EventEmitter = require('events');

class BatchProcessor extends EventEmitter {
  constructor(batchSize = 1000) {
    super();
    this.batchSize = batchSize;
    this.currentBatch = [];
    this.processing = false;
  }

  async processBatch(emails, validationFn) {
    const batches = this.createBatches(emails);
    let results = [];
    let processedCount = 0;

    for (const batch of batches) {
      const batchResults = await this.processSingleBatch(batch, validationFn);
      results = results.concat(batchResults);
      
      processedCount += batch.length;
      const progress = (processedCount / emails.length) * 100;
      
      this.emit('progress', {
        processed: processedCount,
        total: emails.length,
        progress: progress.toFixed(2)
      });
    }

    return results;
  }

  createBatches(emails) {
    const batches = [];
    for (let i = 0; i < emails.length; i += this.batchSize) {
      batches.push(emails.slice(i, i + this.batchSize));
    }
    return batches;
  }

  async processSingleBatch(batch, validationFn) {
    return Promise.all(batch.map(validationFn));
  }
}

module.exports = new BatchProcessor();
