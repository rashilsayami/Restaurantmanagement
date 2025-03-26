const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  logout, 
  getCurrentUser, 
  getUserById, 
  getAllUsers 
} = require('../controllers/userController');
const { loginLimiter } = require('../middlewares/rateLimiter');
const { isAuthenticated, isAdmin } = require('../middlewares/auth');

// Auth routes register login logout
router.post('/register', register);
router.post('/login', loginLimiter, login);
router.post('/logout', isAuthenticated, logout);

// User data routes
router.get('/', isAuthenticated, getCurrentUser);
router.get('/all', isAuthenticated, isAdmin, getAllUsers);
router.get('/:userId', isAuthenticated, isAdmin, getUserById);

module.exports = router;
