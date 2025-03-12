const Job = require('../models/Job');
const User = require('../models/User');

// @desc    Get all applications for a job
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiter only)
const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate('applications.applicant', 'fullName email skills');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the job creator
    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view these applications' });
    }

    res.json(job.applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all applications for current user
// @route   GET /api/applications/me
// @access  Private (Job seeker only)
const getMyApplications = async (req, res) => {
  try {
    const jobs = await Job.find({
      'applications.applicant': req.user._id
    }).select('title company location status applications.$');

    // Format the response
    const applications = jobs.map(job => ({
      job: {
        _id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        status: job.status
      },
      status: job.applications[0].status,
      appliedAt: job.applications[0].appliedAt
    }));

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/job/:jobId/applicant/:applicantId
// @access  Private (Recruiter only)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'reviewed', 'shortlisted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the job creator
    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    // Find the application
    const applicationIndex = job.applications.findIndex(
      app => app.applicant.toString() === req.params.applicantId
    );

    if (applicationIndex === -1) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Update the status
    job.applications[applicationIndex].status = status;
    await job.save();

    res.json(job.applications[applicationIndex]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getJobApplications,
  getMyApplications,
  updateApplicationStatus
}; 