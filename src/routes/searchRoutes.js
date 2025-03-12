const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  searchTalent,
  searchJobs
} = require('../controllers/searchController');

// Public routes
router.get('/jobs', searchJobs);

// Protected routes
router.get('/talent', protect, authorize('recruiter'), searchTalent);

module.exports = router; 