const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  updateProfile,
  getMyProfile,
  getUserProfile,
  getAllProfiles
} = require('../controllers/profileController');

// Private routes
router.get('/', protect, getMyProfile);
router.put('/', protect, updateProfile);
router.get('/all', protect, authorize('recruiter'), getAllProfiles);
router.get('/:id', protect, getUserProfile);

module.exports = router; 