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
        <button onClick={logout} style={{ float: 'right' , padding: '6px 15px', backgroundColor: 'whitesmoke', color: '#222', border: '2.1px solid #222', borderRadius: '9px', fontWeight: 'bold', marginTop: '-3.9px'}}>LOGOUT</button>
      ) : (
        <Link to="/" style={{ float: 'right' }}>Login</Link>
      )}
    </nav>
  );
}
