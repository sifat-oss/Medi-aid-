const mongoose = require('mongoose');

const LoginEventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String },
    userAgent: { type: String },
    email: { type: String, required: true }
});

module.exports = mongoose.model('LoginEvent', LoginEventSchema);