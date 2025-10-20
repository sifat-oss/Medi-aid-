const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// Create
router.post('/', async(req, res) => {
    try {
        const med = new Medicine(req.body);
        await med.save();
        res.status(201).json(med);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read all
router.get('/', async(req, res) => {
    const items = await Medicine.find();
    res.json(items);
});

// Read one
router.get('/:id', async(req, res) => {
    const item = await Medicine.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Not found' });
    res.json(item);
});

// Update
router.put('/:id', async(req, res) => {
    try {
        const item = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', async(req, res) => {
    try {
        await Medicine.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;