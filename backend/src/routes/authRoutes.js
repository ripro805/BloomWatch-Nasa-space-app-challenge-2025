import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { 
  validateRequired, 
  validateEmail, 
  validatePassword,
  sanitizeInput 
} from '../middleware/validation.js';

const router = express.Router();

// Apply sanitization to all routes
router.use(sanitizeInput);

// Public routes
router.post('/register', 
  validateRequired(['email', 'password', 'fullName']),
  validateEmail,
  validatePassword,
  register
);

router.post('/login', 
  validateRequired(['email', 'password']),
  validateEmail,
  login
);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.post('/change-password', 
  authenticateToken,
  validateRequired(['currentPassword', 'newPassword']),
  validatePassword,
  changePassword
);

export default router;
