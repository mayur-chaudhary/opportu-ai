const User = require('../models/User');
const Job = require('../models/Job');

// @desc    Search for AI professionals
// @route   GET /api/search/talent
// @access  Private (Recruiters only)
const searchTalent = async (req, res) => {
  try {
    const {
      skills,
      experience,
      education,
      location,
      search,
      page = 1,
      limit = 10
    } = req.query;

    const query = { userType: 'jobSeeker' };

    // Search by name or skills
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Filter by skills
    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      query.skills = { $in: skillsArray };
    }

    // Filter by experience
    if (experience) {
      query['experience.title'] = { $regex: experience, $options: 'i' };
    }

    // Filter by education
    if (education) {
      query['education.degree'] = { $regex: education, $options: 'i' };
    }

    // Filter by location
    if (location) {
      query['experience.location'] = { $regex: location, $options: 'i' };
    }

    const users = await User.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.json({
      users,
      page: Number(page),
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Search for AI jobs
// @route   GET /api/search/jobs
// @access  Public
const searchJobs = async (req, res) => {
  try {
    const {
      skills,
      type,
      experience,
      location,
      minSalary,
      maxSalary,
      search,
      page = 1,
      limit = 10
    } = req.query;

    const query = { status: 'open' };

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by skills
    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      query.skills = { $in: skillsArray };
    }

    // Filter by job type
    if (type) {
      query.type = type;
    }

    // Filter by experience level
    if (experience) {
      query.experience = experience;
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Filter by salary range
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query['salary.min'] = { $gte: Number(minSalary) };
      if (maxSalary) query['salary.max'] = { $lte: Number(maxSalary) };
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

module.exports = {
  searchTalent,
  searchJobs
}; 