import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './database/db.js';
import cors from 'cors';

// create app first
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Import routes (static imports are hoisted, but keep them here for clarity)
import signupRoutes from './routes/signup.routes.js';
import loginRoutes from './routes/login.routes.js';

// mount routes
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);

await connectDB(); // top-level await is ok in ESM; ensures DB is connected before listening

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});