const Product = require('../models/products.cjs');

// Add Feedback
exports.addFeedback = async (req, res) => {
    try {
        const { productId, comment, rating } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.feedbacks.push({
            userId: req.user.id, // Use user ID from the middleware
            comment,
            rating,
        });

        await product.save();

        res.status(201).json({ message: 'Feedback added successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// View Feedbacks
exports.viewFeedbacks = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId).populate('feedbacks.userId', 'name email');
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ feedbacks: product.feedbacks });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};
