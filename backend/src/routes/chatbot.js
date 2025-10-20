const express = require('express');
const router = express.Router();
const chatbotAdapter = require('../services/chatbotAdapter');
const ChatHistory = require('../models/ChatHistory');

// POST /api/chatbot - send message and receive reply
router.post('/', async(req, res) => {
    const { sessionId, userId, message } = req.body;
    try {
        const reply = await chatbotAdapter.getReply(message, { sessionId, userId });

        // persist
        const chat = new ChatHistory({
            sessionId,
            user: userId,
            messages: [
                { from: 'user', text: message },
                { from: 'bot', text: reply }
            ]
        });
        await chat.save();

        res.json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Chatbot error' });
    }
});

module.exports = router;