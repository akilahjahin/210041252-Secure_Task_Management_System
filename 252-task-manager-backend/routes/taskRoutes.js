//backend/routes/taskRoutes.js
const express = require('express');
const auth = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const taskController = require('../controllers/taskController');
const router = express.Router();

// Create a new task
router.post('/create', auth, taskController.createTask);

// Get all tasks for the authenticated user
router.get('/my-tasks', auth, authorizeRoles('user'), taskController.getMyTasks);

// Get a single task by ID
router.get('/:id', auth, taskController.getTaskById);

// Update a task by ID
router.put('/:id', auth, taskController.updateTask);

// Delete a task by ID
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
