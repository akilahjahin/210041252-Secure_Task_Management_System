// frontend/src/App.jsx
import React, { useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import VerifyEmail from './pages/VerifyEmail';

function AppRoutes() {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Pages where navbar should be hidden
  const hideNavbarPaths = ['/', '/login', '/register'];
  const showNavbar = user && !hideNavbarPaths.includes(location.pathname);

  if (loading) return <div>Loading...</div>;
  console.log('Current Path:', location.pathname);
  console.log('User:', user);

  return (
    <>
      {showNavbar && <Navbar />}
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          {/* Protected Route: Dashboard */}
          <Route
            path="/dashboard"
            element={
              user && user.role === 'user' && user.isVerified ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Protected Route: Admin Panel */}
          <Route
            path="/admin"
            element={
              user && user.role === 'admin' && user.isVerified ? (
                <AdminPanel />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
