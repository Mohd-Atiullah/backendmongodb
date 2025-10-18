// routes/login.routes.js
import express from 'express';
import { loginUser } from '../controller/login.controller.js';
const router = express.Router();

// mounted in index.js as app.use('/api/login', loginRoutes)
router.post('/', loginUser);

export default router;
