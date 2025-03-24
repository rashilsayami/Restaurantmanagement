const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/userController');
const { loginLimiter } = require('../middlewares/rateLimiter');

router.route('/register').post(register);
router.route('/login').post(loginLimiter, login);
router.post('/logout', logout);

module.exports = router;
