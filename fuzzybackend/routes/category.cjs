const express = require('express');
const { v2: cloudinary } = require('cloudinary');
const Category = require('../models/category.cjs'); // Correct import
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET all categories
router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).json(categoryList);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET a category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST create a new category
router.post('/create', async (req, res) => {
    try {
        const pLimit = (await import('p-limit')).default;
        const limit = pLimit(2);

        // Upload images to Cloudinary
        const imagesToUpload = req.body.images.map((image) => {
            return limit(async () => {
                const result = await cloudinary.uploader.upload(image);
                return result;
            });
        });

        const uploadStatus = await Promise.all(imagesToUpload);
        const imgUrls = uploadStatus.map((item) => item.secure_url);

        // Create new category
        const category = new Category({
            name: req.body.name,
            images: imgUrls,
            color: req.body.color
        });

        // Save category to database
        const savedCategory = await category.save();

        res.status(201).json({ success: true, data: savedCategory });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndRemove(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found', success: false });
        }
        res.status(200).json({ success: true, message: 'Category deleted!' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// PUT update a category by ID
router.put('/:id', async (req, res) => {
    try {
        const pLimit = (await import('p-limit')).default;
        const limit = pLimit(2);

        // Update category
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                images: req.body.images, 
                color: req.body.color
            },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'Category not found', success: false });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
