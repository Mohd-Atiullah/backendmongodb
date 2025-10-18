import express from 'express';
import { Login } from '../modals/login.modals.js';
import { Signup } from '../modals/signup.modals.js'; // fallback if you saved users with Signup model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

export async function loginUser(req, res) {
  try {
    console.log('Login request body:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // try Login model first, fallback to Signup model (if users were created there)
    let user = await Login.findOne({ username }).lean();
    let usedModel = 'Login';
    if (!user) {
      user = await Signup.findOne({ username }).lean();
      usedModel = user ? 'Signup' : usedModel;
    }
    console.log('User lookup result (model):', usedModel, !!user);

    if (!user) {
      // keep response generic to avoid leaking which field failed
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    if (!user.password) {
      console.error('User found but password hash missing for user:', user._id);
      return res.status(500).json({ message: 'Account has no password set' });
    }

    const isPasswordValid = await bcrypt.compare(String(password), user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'default_secret_key',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    console.error('Login error stack:', error.stack || error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// map to root so mounted app.use('/api/login', ...) -> POST /api/login
router.post('/', loginUser);
export default router;
