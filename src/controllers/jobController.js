const Job = require('../models/Job');

// @desc    Create a new job posting
// @route   POST /api/jobs
// @access  Private (Recruiters only)
const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      recruiter: req.user._id
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all jobs with filters
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const {
      search,
      type,
      experience,
      location,
      minSalary,
      maxSalary,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filters
    if (type) query.type = type;
    if (experience) query.experience = experience;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }

    const jobs = await Job.find(query)
      .populate('recruiter', 'fullName company')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Job.countDocuments(query);

    res.json({
      jobs,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('recruiter', 'fullName company')
      .populate('applications.applicant', 'fullName email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Job creator only)
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user is the job creator
    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Apply for a job
// @route   POST /api/jobs/:id/apply
// @access  Private (Job seekers only)
const applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if job is open
    if (job.status !== 'open') {
      return res.status(400).json({ message: 'This job is no longer accepting applications' });
    }

    // Check if already applied
    const alreadyApplied = job.applications.find(
      app => app.applicant.toString() === req.user._id.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    job.applications.push({
      applicant: req.user._id,
      status: 'pending'
    });

    await job.save();

    res.json({ message: 'Successfully applied to job' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  applyForJob
}; 