const express = require('express');
const router = express.Router();
const Order = require('../models/order.cjs');
const User = require('../models/User.cjs');

router.post('/orders', async (req, res) => {
    const { email, shippingAddress, totalAmount } = req.body;

    try {
        const user = await User.findOne({ email }).populate('cart.productId');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const newOrder = new Order({
            userId: user._id,
            items: user.cart,
            totalAmount,
            shippingAddress,
        });

        await newOrder.save();

        // Clear the cart after order placement
        user.cart = [];
        await user.save();

        res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error placing order' });
    }
});

module.exports = router;
