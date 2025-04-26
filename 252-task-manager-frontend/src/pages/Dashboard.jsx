// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import taskService from '../services/taskService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    priority: '',
    category: '',
    dueDate: ''
  });
  const [sortBy, setSortBy] = useState('');

  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch tasks only when manually triggered
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getMyTasks(token);
      setTasks(data);
      setIsFiltered(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(
        { ...taskData, user: user._id },
        token
      );
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.updateTask(id, updates, token);
      setTasks(tasks.map(task =>
        task._id === id ? updatedTask : task
      ));
      if (isFiltered) {
        setFilteredTasks(filteredTasks.map(task =>
          task._id === id ? updatedTask : task
        ));
      }
      setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id, token);
      setTasks(tasks.filter(task => task._id !== id));
      if (isFiltered) {
        setFilteredTasks(filteredTasks.filter(task => task._id !== id));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Remove empty filters
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      );

      // Debugging purposes
      console.log('Active filters:', activeFilters);

      if (Object.keys(activeFilters).length === 0) {
        setIsFiltered(false);
        return;
      }

      const filtered = await taskService.filterTasks(activeFilters, token);
      setFilteredTasks(filtered);
      setIsFiltered(true);
      setError(null);
    } catch (err) {
      console.error('Filter error:', err); // error messages for debugging purposes
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = async (e) => {
    const value = e.target.value;
    setSortBy(value);

    if (value) {
      try {
        setLoading(true);
        const response = await taskService.sortTasks(value, token);

        if (response.success) {
          const sortedTasks = response.data;
          if (isFiltered) {
            setFilteredTasks(sortedTasks);
          } else {
            setTasks(sortedTasks);
          }
        } else {
          throw new Error(response.message || 'Failed to sort tasks');
        }
      } catch (err) {
        console.error('Sorting failed:', err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const resetFilters = () => {
    setFilters({
      priority: '',
      category: '',
      dueDate: ''
    });
    setIsFiltered(false);
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  useEffect(() => {
    if (!user || user.role !== 'user') {
      navigate('/login');
    }
  }, [user, navigate]);

  const displayedTasks = isFiltered ? filteredTasks : tasks;
  const tableCaption = isFiltered
    ? `Filtered Tasks by ${Object.entries(filters)
        .filter(([_, v]) => v)
        .map(([k, v]) => `${k}=${v}`)
        .join(', ')}`
    : tasks.length > 0 ? 'All Tasks' : 'No Tasks Loaded';

  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.name}!</h1>

      <div className="controls-section">
        <div className="task-controls">
          <button onClick={fetchTasks} className="btn primary">
            Read My Tasks
          </button>

          <div className="sort-control">
            <label>Sort By:</label>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="">-- Select --</option>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        </div>

        <form onSubmit={handleFilterSubmit} className="filter-form">
          <h3>Filter My Tasks</h3>
          <div className="filter-fields">
            <div className="filter-field">
              <label>Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
              >
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Category</label>
              <input
                type="text"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                placeholder="e.g. Work"
              />
            </div>

            <div className="filter-field">
              <label>Due Date</label>
              <input
                type="date"
                value={filters.dueDate}
                onChange={(e) => setFilters({...filters, dueDate: e.target.value})}
              />
            </div>
          </div>

          <div className="filter-actions">
            <button type="submit" className="btn primary">
              Filter
            </button>
            <button
              type="button"
              onClick={resetFilters}
              className="btn secondary"
            >
              Clear Filters
            </button>
          </div>
        </form>
      </div>

      <TaskForm
        onSubmit={editingTask ?
          (data) => handleUpdateTask(editingTask._id, data) :
          handleCreateTask
        }
        task={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading...</div>}

      <div className="tasks-table-container">
        <h2>{tableCaption}</h2>
        {displayedTasks.length > 0 ? (
          <table className="tasks-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedTasks.map(task => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
                  <td className={`priority-${task.priority}`}>
                    {task.priority}
                  </td>
                  <td>{task.category || '-'}</td>
                  <td className={`status-${task.completed ? 'completed' : 'pending'}`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => startEditing(task)}
                      className="btn edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleUpdateTask(task._id, { completed: !task.completed })}
                      className="btn status"
                    >
                      {task.completed ? 'Mark Pending' : 'Mark Complete'}
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="btn delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No tasks found. Click "Read My Tasks" to load tasks.</p>
        )}
      </div>

      <style jsx>{`
        .dashboard-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .controls-section {
          margin: 2rem 0;
        }

        .task-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .sort-control {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-form {
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .filter-fields {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin: 1rem 0;
        }

        .filter-field {
          display: flex;
          flex-direction: column;
        }

        .filter-actions {
          display: flex;
          gap: 0.5rem;
        }

        .tasks-table-container {
          margin-top: 2rem;
          overflow-x: auto;
        }

        .tasks-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }

        .tasks-table th,
        .tasks-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .tasks-table th {
          background-color: #f2f2f2;
          position: sticky;
          top: 0;
        }

        .priority-high {
          color: #d32f2f;
          font-weight: bold;
        }

        .priority-medium {
          color: #ffa000;
          font-weight: bold;
        }

        .priority-low {
          color: #388e3c;
          font-weight: bold;
        }

        .status-completed {
          color: #388e3c;
        }

        .status-pending {
          color: #d32f2f;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .btn.primary {
          background: #4CAF50;
          color: white;
        }

        .btn.secondary {
          background: #f5f5f5;
          border: 1px solid #ddd;
        }

        .btn.edit {
          background: #2196F3;
          color: white;
        }

        .btn.status {
          background: #FFC107;
          color: black;
        }

        .btn.delete {
          background: #F44336;
          color: white;
        }

        .error-message {
          color: #d32f2f;
          padding: 1rem;
          background: #ffebee;
          border-radius: 4px;
          margin: 1rem 0;
        }

        .loading {
          padding: 1rem;
          text-align: center;
          color: #666;
        }
      `}</style>
    </div>
  );
}