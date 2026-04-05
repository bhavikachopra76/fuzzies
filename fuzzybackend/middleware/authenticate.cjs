const jwt = require('jsonwebtoken');
const User = require('../models/User.cjs'); 
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'No token provided. Authorization denied.' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; 

       
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        next(); 
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
};

module.exports = authenticate;
