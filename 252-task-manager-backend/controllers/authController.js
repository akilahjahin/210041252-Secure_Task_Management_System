//backend/controllers/authController.js
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendVerificationEmail = require('../utils/emailService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    // since my mongoose uses a pre save HASH, i haven not hashed the function separately
    const newUser = await User.create({ name, email, password, role });

    await sendVerificationEmail(newUser);

    res.status(201).json({ message: 'Registered. Check your email to verify.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    // Send back user data and token in response
    res.json({
      token, // Include the JWT token
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified, // Send the verification status
      isAdmin: user.role === 'admin',
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Verify Email
exports.verifyEmail = async (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).json({ message: 'Missing token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    user.isVerified = true;
    await user.save();

    // You can redirect to login page or a verification success page
    return res.status(200).json({
      success: true,
      message: 'Email verified successfully!',
    });
  } catch (err) {
    console.error('Email verification error:', err);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};