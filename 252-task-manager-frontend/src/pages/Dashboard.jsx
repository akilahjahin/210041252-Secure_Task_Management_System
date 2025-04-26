// frontend/src/pages/Dashboard.jsx
// Dashboard is for regular users, not the admin
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import taskService from '../services/taskService';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    taskService.getAll().then(setTasks);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if token is not found
    }
  }, [navigate]);

  const handleAddTask = async (task) => {
    const newTask = await taskService.create(task);
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <TaskForm onSubmit={handleAddTask} />
      {tasks.map(task => <TaskCard key={task._id} task={task} />)}
    </div>
  );
}