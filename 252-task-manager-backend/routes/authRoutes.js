//backend/routes/authRoutes.js
const express = require('express');
const { register, login, getAllUsers, verifyEmail } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, authorizeRoles('admin'), getAllUsers);
router.get('/verify-email', verifyEmail);
router.get('/user', protect, (req, res) => {
    res.json(req.user); // Returns user data (excluding password)
});

module.exports = router;