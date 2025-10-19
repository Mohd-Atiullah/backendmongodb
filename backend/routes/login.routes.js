// routes/login.routes.js
import express from 'express';
import { loginUser } from '../controller/login.controller.js';
const router = express.Router();

// index.js mounts this on /api/login -> POST /api/login
router.post('/', loginUser);

export default router;
