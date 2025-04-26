// frontend/src/pages/Register.jsx
import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', role: '', password: '' });
  const [message, setMessage] = useState('');
  //const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(form);
      setMessage(`Check and verify your email at ${form.email}`);
      //navigate('/');
    } catch (err) {
      console.error("Registration failed:", err);
      setMessage("Failed to register. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', background: '#f4f7fa', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.8rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.8rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.8rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.8rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{
            width: '100%', padding: '0.8rem', backgroundColor: '#2196F3', color: '#fff', border: 'none', borderRadius: '4px'
          }}
        >
          Register
        </button>
      </form>
      {message && <p style={{ textAlign: 'center', color: '#00796b' }}>{message}</p>}
    </div>
  );
}
