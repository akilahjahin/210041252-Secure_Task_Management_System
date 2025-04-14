const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(auth, createTask)
  .get(auth, getTasks);

router.route('/:id')
  .put(auth, updateTask)
  .delete(auth, deleteTask);

module.exports = router;