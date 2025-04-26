// frontend/src/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, task: editingTask, onCancel }) {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: '',
    completed: false
  });

  useEffect(() => {
    if (editingTask) {
      setTaskData({
        title: editingTask.title,
        description: editingTask.description,
        dueDate: editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '',
        priority: editingTask.priority,
        category: editingTask.category || '',
        completed: editingTask.completed || false
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setTaskData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) return;

    // Format dueDate properly before submission
    const submissionData = {
      ...taskData,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null
    };

    onSubmit(submissionData);

    if (!editingTask) {
      // Reset form only if not in edit mode
      setTaskData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        category: '',
        completed: false
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>

      <div className="form-group">
        <label>Title*</label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={taskData.category}
            onChange={handleChange}
            placeholder="e.g. Work, Personal"
          />
        </div>
      </div>

      {editingTask && (
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="completed"
              checked={taskData.completed}
              onChange={handleCheckboxChange}
            />
            Completed
          </label>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn primary">
          {editingTask ? 'Update Task' : 'Create Task'}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="btn secondary"
          >
            Cancel
          </button>
        )}
      </div>

      <style jsx>{`
        .task-form {
          background: #f9f9f9;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
        }

        .form-row .form-group {
          flex: 1;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        input[type="text"],
        input[type="date"],
        textarea,
        select {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .btn.primary {
          background: #4CAF50;
          color: white;
        }

        .btn.secondary {
          background: #f5f5f5;
          border: 1px solid #ddd;
        }
      `}</style>
    </form>
  );
}