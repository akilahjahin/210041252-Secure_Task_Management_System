// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);  // ✅ Ensure loading is always set to false
      }
    };
    fetchUser();
  }, []);


  const login = async (email, password) => {
    try {
      const res = await authService.login(email, password);
      if (res?.token) {
        const userObj = {
          name: res.name,
          email: res.email,
          isAdmin: res.isAdmin,
          isVerified: res.isVerified,
          token: res.token,
          role: res.isAdmin ? 'admin' : 'user'
        };

        setUser(userObj);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(userObj));
        return userObj;
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token: user?.token, loading }}>
      {!loading && children} {/* ✅ only render children after loading */}
    </AuthContext.Provider>
  );
}
