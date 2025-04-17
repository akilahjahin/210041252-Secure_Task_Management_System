// src/components/TaskCard.jsx
import React from 'react';

export default function TaskCard({ task }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem'
    }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>Status: {task.status || 'Pending'}</small>
    </div>
  );
}
