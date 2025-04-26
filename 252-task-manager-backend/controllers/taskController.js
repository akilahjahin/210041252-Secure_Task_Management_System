//backend/controllers/taskController.js
const Task = require('../models/Task');
const mongoose = require('mongoose');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task' });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve task' });
  }
};

// Get all tasks for the authenticated user
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve tasks' });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

// Sorting tasks by priority or duedate
exports.sortTasks = async (req, res) => {
  try {
    const { sortBy } = req.query;
    const userId = req.user.id;

    if (!['priority', 'dueDate'].includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sort parameter'
      });
    }

    if (sortBy === 'priority') {
      const tasks = await Task.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        {
          $addFields: {
            priorityOrder: {
              $switch: {
                branches: [
                  { case: { $eq: ["$priority", "high"] }, then: 1 },
                  { case: { $eq: ["$priority", "medium"] }, then: 2 },
                  { case: { $eq: ["$priority", "low"] }, then: 3 }
                ],
                default: 4
              }
            }
          }
        },
        { $sort: { priorityOrder: 1 } },
        { $project: { priorityOrder: 0 } }
      ]);
      return res.json({ success: true, data: tasks });
    } else {
      // dueDate sorting
      const tasks = await Task.find({ user: userId }).sort({ dueDate: 1 });
      return res.json({ success: true, data: tasks });
    }
  } catch (err) {
    console.error('Sorting Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to sort tasks',
      error: err.message
    });
  }
};