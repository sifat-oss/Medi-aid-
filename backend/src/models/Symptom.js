const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Symptom', SymptomSchema);