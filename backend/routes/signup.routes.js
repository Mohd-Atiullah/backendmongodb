import express from 'express';
import { signupUser } from '../controller/signup.controller.js';
const router = express.Router();

// index.js mounts this on /api/signup -> POST /api/signup
router.post('/', signupUser);

export default router;
