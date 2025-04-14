import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authService.register(form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Register</button>
    </form>
  );
}