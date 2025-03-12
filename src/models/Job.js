const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  requirements: [{
    type: String,
    trim: true
  }],
  skills: [{
    type: String,
    trim: true
  }],
  location: {
    type: String,
    required: [true, 'Job location is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    required: true
  },
  experience: {
    type: String,
    enum: ['entry', 'intermediate', 'senior', 'lead'],
    required: true
  },
  salary: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'draft'],
    default: 'open'
  },
  applications: [{
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
      default: 'pending'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Add text index for search functionality
jobSchema.index({ 
  title: 'text', 
  description: 'text', 
  company: 'text',
  skills: 'text' 
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job; 