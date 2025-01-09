// logger.js
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Create a write stream (in append mode)
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Setup the morgan logger
const logger = morgan('combined', { stream: logStream });

module.exports = logger;