const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors'); // To handle CORS
const csurf = require('csurf');
const logger = require('./logger');
const app = express();
const PORT = 4000;

// Enable CORS for all routes
app.use(cors());

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});

app.use(limiter);
app.use(csurf());
app.use(logger);



// Sample route to test the server
app.get('/', (req, res) => {
  console.log("Welcome to the server");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});