// frontend/src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#fff', borderBottom: '1px solid #ccc' }}>
      <Link to="/dashboard">Dashboard</Link>

      {user?.isAdmin && (
        <Link to="/admin" style={{ marginLeft: '1rem' }}>Admin</Link>
      )}

      {user ? (
        <button onClick={logout} style={{ float: 'right' }}>Logout</button>
      ) : (
        <Link to="/" style={{ float: 'right' }}>Login</Link>
      )}
    </nav>
  );
}
