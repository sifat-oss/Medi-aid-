const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const LoginEvent = require('../models/LoginEvent');
const User = require('../models/User');
const ChatHistory = require('../models/ChatHistory');

// Middleware to verify admin role
const verifyAdmin = async(req, res, next) => {
    try {
        const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
        if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findById(decoded.user.id);
        if (!user || user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Get all login events
router.get('/login-events', verifyAdmin, async(req, res) => {
    try {
        const loginEvents = await LoginEvent.find().populate('userId', 'name email').sort({ timestamp: -1 });
        res.json(loginEvents);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all chat histories
router.get('/chat-histories', verifyAdmin, async(req, res) => {
    try {
        const chatHistories = await ChatHistory.find().populate('user', 'name email').sort({ createdAt: -1 });
        res.json(chatHistories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;