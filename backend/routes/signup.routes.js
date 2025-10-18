// routes/signup.routes.js
import express from 'express';
import { signupUser } from '../controller/signup.controller.js'; // must match named export
const router = express.Router();

// mounted at /api/signup in index.js => POST /api/signup
router.post('/', signupUser);

export default router;
