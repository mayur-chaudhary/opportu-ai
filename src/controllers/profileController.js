const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      skills,
      experience,
      education,
      company
    } = req.body;

    // Build profile object
    const profileFields = {};
    if (fullName) profileFields.fullName = fullName;
    if (skills) profileFields.skills = skills;
    if (experience) profileFields.experience = experience;
    if (education) profileFields.education = education;
    if (company && req.user.userType === 'recruiter') {
      profileFields.company = company;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: profileFields },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current user profile
// @route   GET /api/profile
// @access  Private
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile by ID
// @route   GET /api/profile/:id
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all profiles
// @route   GET /api/profile/all
// @access  Private (Recruiters only)
const getAllProfiles = async (req, res) => {
  try {
    const { 
      skills, 
      experience, 
      search,
      page = 1,
      limit = 10
    } = req.query;

    const query = { userType: 'jobSeeker' };

    // Filter by skills
    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      query.skills = { $in: skillsArray };
    }

    // Filter by experience level
    if (experience) {
      query['experience.title'] = { $regex: experience, $options: 'i' };
    }

    // Search by name or skills
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } }
      ];
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

module.exports = {
  updateProfile,
  getMyProfile,
  getUserProfile,
  getAllProfiles
}; 