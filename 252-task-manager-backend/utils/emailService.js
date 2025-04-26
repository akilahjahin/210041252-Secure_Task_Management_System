//backend/utils/emailService.js
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (user) => {
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ exists' : '❌ missing');
  console.log('CLIENT_URL:', process.env.CLIENT_URL);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  const url = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    to: user.email,
    subject: 'Verify Your Email',
    html: `<p>Please verify your email by clicking the link below:</p><a href="${url}">${url}</a>`,
  });
};

module.exports = sendVerificationEmail;
