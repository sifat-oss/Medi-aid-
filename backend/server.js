require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/symptoms', require('./src/routes/symptoms'));
app.use('/api/medicines', require('./src/routes/medicines'));
app.use('/api/chatbot', require('./src/routes/chatbot'));
app.use('/api/admin', require('./src/routes/admin'));

app.get('/', (req, res) => res.json({ message: 'Medi-aid backend running' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));