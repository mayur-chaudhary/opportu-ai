const { validationResult, body } = require('express-validator');

// Middleware to check for validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules for user registration
const registerValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('userType')
    .isIn(['jobSeeker', 'recruiter'])
    .withMessage('Invalid user type'),
  body('company')
    .if(body('userType').equals('recruiter'))
    .notEmpty()
    .withMessage('Company name is required for recruiters'),
  validateRequest
];

// Validation rules for job posting
const jobValidation = [
  body('title').trim().notEmpty().withMessage('Job title is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('description').trim().notEmpty().withMessage('Job description is required'),
  body('location').trim().notEmpty().withMessage('Job location is required'),
  body('type')
    .isIn(['full-time', 'part-time', 'contract', 'internship'])
    .withMessage('Invalid job type'),
  body('experience')
    .isIn(['entry', 'intermediate', 'senior', 'lead'])
    .withMessage('Invalid experience level'),
  body('salary.min')
    .isNumeric()
    .withMessage('Minimum salary must be a number'),
  body('salary.max')
    .isNumeric()
    .withMessage('Maximum salary must be a number')
    .custom((value, { req }) => {
      if (value < req.body.salary.min) {
        throw new Error('Maximum salary must be greater than minimum salary');
      }
      return true;
    }),
  validateRequest
];

module.exports = {
  registerValidation,
  jobValidation
}; 