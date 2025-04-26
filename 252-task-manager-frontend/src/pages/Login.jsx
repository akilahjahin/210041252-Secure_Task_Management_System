//frontend/src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService'; // Ensure you import the correct service

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Assuming you're using context for global state management
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();

      const user = await login(email, password);  // Use the corrected login function from the service
      console.log("Login response user:", user);

      if (!user) {
        console.error('Login failed: No user returned');
        alert("Invalid login credentials");
        return;
      }

      if (!user.isVerified) {
        alert("Please verify your email before logging in.");
        return;
      }

      // Store the token in localStorage
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user)); // Store the entire user object for later use

      // For debugging
      console.log("Token stored in localStorage:", localStorage.getItem('token'));
      console.log("User stored in localStorage:", JSON.parse(localStorage.getItem('user')));

      // Navigate based on user role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', background: '#f4f7fa', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '0.8rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '0.8rem', marginBottom: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          style={{
            width: '100%', padding: '0.8rem', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px'
          }}
        >
          Login
        </button>
      </form>
      <button
          type="button"
          style={{
            width: '100%', padding: '0.8rem', backgroundColor: '#222', color: '#fff', border: 'none', borderRadius: '4px', marginTop: '12px'
          }}
          onClick={() => navigate('/')}
        >
          Go Back To Home
        </button>
    </div>
  );
}
