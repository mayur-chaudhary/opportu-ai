const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { registerValidation } = require('../middleware/validate');

router.post('/register', registerValidation, register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

module.exports = router; 