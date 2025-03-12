const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  userType: {
    type: String,
    enum: ['jobSeeker', 'recruiter'],
    required: [true, 'User type is required']
  },
  company: {
    type: String,
    required: function() {
      return this.userType === 'recruiter';
    }
  },
  skills: [{
    type: String,
    trim: true
  }],
  experience: [{
    title: String,
    company: String,
    location: String,
    from: Date,
    to: Date,
    current: Boolean,
    description: String
  }],
  education: [{
    school: String,
    degree: String,
    fieldOfStudy: String,
    from: Date,
    to: Date,
    current: Boolean
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 