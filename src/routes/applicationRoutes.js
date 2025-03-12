const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getJobApplications,
  getMyApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');

// Job seeker routes
router.get('/me', protect, authorize('jobSeeker'), getMyApplications);

// Recruiter routes
router.get('/job/:jobId', protect, authorize('recruiter'), getJobApplications);
router.put('/job/:jobId/applicant/:applicantId', protect, authorize('recruiter'), updateApplicationStatus);

module.exports = router; 