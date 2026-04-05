const express = require('express');
const { saveBillingDetails, getBillingDetails } = require('../Controllers/billingController.cjs'); // Import the controller
const router = express.Router();

// Route to handle saving billing details (POST)
router.post('/billing', saveBillingDetails);

// Route to handle getting billing details (GET)
router.get('/billing', getBillingDetails);

module.exports = router;
