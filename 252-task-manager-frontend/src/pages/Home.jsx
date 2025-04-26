// frontend/src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <h1 style={{ marginBottom: '2rem' }}>Welcome to Task Manager</h1>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Are you a registered user?</p>
        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '0.5rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '5px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none'
          }}
        >
          Login
        </button>
      </div>

      <div>
        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>If you're new here:</p>
        <button
          onClick={() => navigate('/register')}
          style={{
            padding: '0.5rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '5px',
            backgroundColor: '#2196F3',
            color: '#fff',
            border: 'none'
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
