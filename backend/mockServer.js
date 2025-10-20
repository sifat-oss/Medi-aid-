const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simple symptoms list
app.get('/api/symptoms', (req, res) => {
    res.json({
        symptoms: [
            'Fever', 'Headache', 'Cough', 'Fatigue', 'Sore Throat',
            'Shortness of Breath', 'Body Aches', 'Nausea', 'Dizziness'
        ]
    });
});

// Mock medicines endpoint
app.get('/api/medicines', (req, res) => {
    res.json({
        medicines: [
            { id: 1, name: 'Paracetamol', dosage: '500mg', type: 'Analgesic' },
            { id: 2, name: 'Ibuprofen', dosage: '200mg', type: 'NSAID' },
            { id: 3, name: 'Amoxicillin', dosage: '500mg', type: 'Antibiotic' }
        ]
    });
});

// Simple auth mock (login)
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body || {};
    if (email && password) {
        // return a fake token
        return res.json({ token: 'mock-jwt-token', user: { id: 'u1', email } });
    }
    res.status(400).json({ error: 'Missing credentials' });
});

// Mock medical reports
app.get('/api/reports', (req, res) => {
    res.json({
        reports: [
            { id: 'r1', title: 'Blood Test - Jan 2025', date: '2025-01-15' },
            { id: 'r2', title: 'MRI Scan - Feb 2025', date: '2025-02-20' }
        ]
    });
});

// Mock chatbot endpoint
app.post('/api/chatbot', (req, res) => {
    const { message } = req.body || {};
    if (!message) return res.json({ reply: "Please describe your symptoms." });

    const lower = message.toLowerCase();
    if (lower.includes('fever')) {
        return res.json({ reply: 'It sounds like you have a fever — monitor your temperature and consider rest and fluids. Seek care if high or persistent.' });
    }
    if (lower.includes('headache')) {
        return res.json({ reply: 'For headaches try rest and hydration. If intense or accompanied by other symptoms, consult a doctor.' });
    }

    res.json({ reply: "This is a mock response: I can provide general guidance. For real diagnostics, connect to the real backend AI." });
});

const PORT = process.env.MOCK_PORT || 5000;
app.listen(PORT, () => console.log(`Mock server listening on port ${PORT}`));