require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'webp'], // Allowed image formats including WebP
        public_id: (req, file) => 'computed-filename-' + Date.now(), // File naming logic
    },
});

const upload = multer({ storage });

module.exports = upload;