const express = require('express');
const Product = require('../models/products.cjs'); // Import Product model
const Category = require('../models/category.cjs'); // Import Category model
const { v2: cloudinary } = require('cloudinary');
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all products or filter by category names
router.get('/', async (req, res) => {
    try {
        let filter = {};
        
        // Check if category filter is provided in the query
        if (req.query.categoryNames) {
            const categoryNames = req.query.categoryNames.split(',').map(name => name.trim()); // Split comma-separated category names

            const categories = await Category.find({ name: { $in: categoryNames } });
            const categoryIds = categories.map(category => category._id);

            if (categoryIds.length === 0) {
                return res.status(404).json({ success: false, message: 'No categories found' });
            }

            filter = { category: { $in: categoryIds } }; // Filter products by the found category IDs
        }

        // Fetch products with optional filtering by category
        const productList = await Product.find(filter).populate('category');

        if (!productList || productList.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        res.send(productList);
    } catch (err) {
        console.error('Error:', err); 
        res.status(500).json({ success: false, error: err.message });
    }
});

// Create a new product
router.post('/create', async (req, res) => {
    try {
        console.log('Request Body:', req.body);  

        const pLimit = (await import('p-limit')).default;
        const limit = pLimit(2);

        // Upload images to Cloudinary
        const imageUploads = req.body.images.map((image) => {
            return limit(() => cloudinary.uploader.upload(image));
        });

        const uploadResults = await Promise.all(imageUploads);
        const imageUrls = uploadResults.map(result => result.secure_url);

       
        console.log('Category Name:', req.body.category);

        // Validate category by name
        const category = await Category.findOne({ name: req.body.category });
        console.log('Found Category:', category);  // Log the result of the findOne query

        if (!category) {
            return res.status(404).json({ success: false, message: 'Invalid category' });
        }

        // Create and save the product
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: category._id, // Store the category ID
            rating: req.body.rating,
            images: imageUrls
        });

        const savedProduct = await product.save();
        if (!savedProduct) {
            return res.status(500).json({ success: false, message: 'Product could not be created' });
        }

        res.status(201).json({ success: true, data: savedProduct });
    } catch (err) {
        console.error('Error:', err);  // Log errors for debugging
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete a Product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({_id:req.params.id});
        
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully', data: deletedProduct });
    } catch (err) {
        console.error('Error:', err);  
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update a Product
router.put('/:id', async (req, res) => {
    try {
        // Log the request body and parameters for debugging
        console.log('Request Body:', req.body);
        console.log('Product ID:', req.params.id);

        // Upload images to Cloudinary if they are provided
        let imageUrls = [];
        if (req.body.images && req.body.images.length > 0) {
            const pLimit = (await import('p-limit')).default;
            const limit = pLimit(2);
            const imageUploads = req.body.images.map((image) => limit(() => cloudinary.uploader.upload(image)));
            const uploadResults = await Promise.all(imageUploads);
            imageUrls = uploadResults.map(result => result.secure_url);
        }

        // Validate category by name
        const category = await Category.findOne({ name: req.body.category });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Invalid category' });
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: category._id, // Update with the category ID
                rating: req.body.rating,
                images: imageUrls.length > 0 ? imageUrls : req.body.images // Use the new image URLs if provided
            },
            { new: true } // Return the updated product
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (err) {
        console.error('Error:', err);  // Log errors for debugging
        res.status(500).json({ success: false, error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        let filter = {};

        // Handle category filter
        if (req.query.categoryNames) {
            const categoryNames = req.query.categoryNames.split(',').map(name => name.trim());
            const categories = await Category.find({ name: { $in: categoryNames } });
            filter.category = { $in: categories.map(category => category._id) };
        }

        // Handle price filter
        if (req.query.price) {
            if (req.query.price === "under50") filter.price = { $lt: 50 };
            if (req.query.price === "50to100") filter.price = { $gte: 50, $lte: 100 };
            if (req.query.price === "over100") filter.price = { $gt: 100 };
        }

        // Handle rating filter
        if (req.query.rating) {
            if (req.query.rating === "under4") filter.rating = { $lt: 4 };
            if (req.query.rating === "4to4.5") filter.rating = { $gte: 4, $lte: 4.5 };
            if (req.query.rating === "above4.5") filter.rating = { $gt: 4.5 };
        }

        // Find and return the filtered products
        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
