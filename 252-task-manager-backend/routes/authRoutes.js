const express = require('express');
const { register, login, getAllUsers } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const router = express.Router();
const { verifyEmail } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, authorizeRoles('admin'), getAllUsers);
router.get('/verify-email', verifyEmail);

module.exports = router;