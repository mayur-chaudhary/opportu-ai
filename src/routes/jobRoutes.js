const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { jobValidation } = require('../middleware/validate');
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  applyForJob
} = require('../controllers/jobController');

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// Protected routes
router.post('/', protect, authorize('recruiter'), jobValidation, createJob);
router.put('/:id', protect, authorize('recruiter'), jobValidation, updateJob);
router.post('/:id/apply', protect, authorize('jobSeeker'), applyForJob);

module.exports = router; 