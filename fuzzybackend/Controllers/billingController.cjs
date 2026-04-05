const User = require('../models/User.cjs');  // Ensure correct path and model import

// Save billing details
const saveBillingDetails = async (req, res) => {
    const { email, shipmentDetails, totalAmount, paymentReceipt } = req.body;

    // Ensure all required fields are provided
    if (!email || !shipmentDetails || !totalAmount || !paymentReceipt) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Create new Billing record
        const billing = {
            shipmentDetails,
            totalAmount,
            paymentReceipt,
        };

        // Ensure billing array exists
        if (!user.billing) {
            user.billing = [];
        }

        // Push the new billing info into the user's billing array
        user.billing.push(billing);

        // Save the user document
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Billing details saved successfully',
            billing: billing,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to save billing details',
        });
    }
};

// Get billing details
const getBillingDetails = async (req, res) => {
    let { email } = req.query;

    // Ensure email is provided and sanitized
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    email = email.trim(); // Remove extra spaces from the email

    try {
        // Use a case-insensitive regex to find the user by email
        const user = await User.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } });

        if (!user) {
            return res.status(404).json({ success: false, message: `User not found for email: ${email}` });
        }

        if (!user.billing || user.billing.length === 0) {
            return res.status(404).json({ success: false, message: `No billing details found for email: ${email}` });
        }

        res.status(200).json({ success: true, billing: user.billing });
    } catch (error) {
        console.error('Error fetching billing details:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch billing details' });
    }
};

module.exports = { saveBillingDetails, getBillingDetails };
