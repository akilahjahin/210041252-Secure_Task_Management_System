//backend/routes/taskRoutes.js
const express = require('express');
const mongoose = require('mongoose');

const Task = require('../models/Task');
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

// Task filering by priority, category, AND/OR due date
router.post('/my-tasks/filter', auth, async (req, res) => {
  try {
    console.log('Received filter request:', req.body); // Add this for debugging

    const { priority, category, dueDate } = req.body;
    const filter = { user: req.user.id };

    if (priority) filter.priority = priority;
    if (category) {
      filter.category = {
        $regex: category,
        $options: 'i' // case insensitive
      };
    }
    if (dueDate) {
      const date = new Date(dueDate);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }

      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.dueDate = { $gte: start, $lte: end };
    }

    console.log('Final filter query:', filter); // Debug the final query

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);

  } catch (err) {
    console.error('Filter error:', err);
    res.status(500).json({ error: 'Filtering failed', details: err.message });
  }
});

// Sort tasks based on priority/ duedate
router.get('/my-tasks/sort', auth, taskController.sortTasks);

  // Error handling middleware
  router.use((err, req, res, next) => {
    console.error('Route Error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server error'
    });
  });

  router.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Endpoint not found'
    });
  });

module.exports = router;