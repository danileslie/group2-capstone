require('dotenv').config();
const express = require('express');
const cors = require('cors');

const healthRouter = require('./routes/health');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/health', healthRouter);
app.use('/api/users', userRouter);

module.exports = app;
