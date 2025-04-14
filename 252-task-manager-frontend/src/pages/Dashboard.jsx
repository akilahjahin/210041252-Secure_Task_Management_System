import React, { useEffect, useState } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import taskService from '../services/taskService';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskService.getAll().then(setTasks);
  }, []);

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