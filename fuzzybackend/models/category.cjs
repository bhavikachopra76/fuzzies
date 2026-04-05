const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: [{   
        type: String
    }],
    color: {
        type: String,
        required: true
    }
});

// Export the Category model
module.exports = mongoose.model('Category', categorySchema);
