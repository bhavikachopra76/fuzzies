const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Route to handle checkout
router.post('/checkout', async (req, res) => {
    const { token, amount } = req.body;

    if (!token || !amount) {
        return res.status(400).json({ error: 'Token and amount are required' });
    }

    // Ensure that the amount is at least ₹50 (5000 cents)
    const MINIMUM_AMOUNT = 5000; // ₹50 in cents

    if (amount < MINIMUM_AMOUNT) {
        return res.status(400).json({ error: 'Amount must be at least ₹50' });
    }

    try {
        const charge = await stripe.charges.create({
            amount,
            currency: 'inr',
            source: token,
            description: 'Test charge',
        });

        res.status(200).json({
            success: true,
            receiptUrl: charge.receipt_url,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment failed!' });
    }
});

module.exports = router;
