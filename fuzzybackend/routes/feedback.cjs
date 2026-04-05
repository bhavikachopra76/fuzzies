const express = require('express');
const router = express.Router();
const  verifyToken  = require('../routes/auth.cjs'); // Adjust path if needed
const Product = require('../models/products.cjs'); // Ensure Product model is correctly implemented

// Add feedback to a product
router.post('/:productId/feedback', verifyToken, async (req, res) => {
  const { productId } = req.params;
  const { feedback, userEmail} = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    product.feedbacks.push({ feedback, userEmail });
    await product.save();

    res.status(201).json({ success: true, feedbacks: product.feedbacks });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ success: false, message: 'Error adding feedback' });
  }
});

// Fetch product details along with feedback
router.get('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: 'Error fetching product' });
  }
});

module.exports = router;
