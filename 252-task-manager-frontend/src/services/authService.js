//frontend/src/services/authService.js
const API = import.meta.env.VITE_API_URL + '/auth';

const authService = {
  login: async (email, password) => {
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('Login Error:', err.message || 'Login failed');
        throw new Error(err.message || 'Login failed');
      }

      const data = await res.json();
      console.log("Login response data:", data); // Log the full response for debugging

      return data; // Should return { token, name, email, isAdmin, isVerified }
    } catch (error) {
      console.error('Login Error:', error.message);
      throw error; // Rethrow the error for handling in the calling function
    }
  },

  register: async (data) => {
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Registration failed');
      }

      return await res.json(); // Returns { message: 'Registered. Check your email to verify.' }
    } catch (error) {
      console.error('Registration Error:', error);
      throw error;
    }
  },

  getAllUsers: async (token) => {
    try {
      const res = await fetch(`${API}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to fetch users');
      }

      return await res.json();
    } catch (error) {
      console.error('Get Users Error:', error);
      throw error;
    }
  }
};

export default authService;