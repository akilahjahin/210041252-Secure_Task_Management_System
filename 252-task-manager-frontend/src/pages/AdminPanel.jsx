// frontend/src/pages/AdminPanel.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await authService.getAllUsers(token);
      // Filter out admin users and format verification status
      const formattedUsers = data
        .filter(user => user.role === 'user')
        .map(user => ({
          ...user,
          isVerified: user.isVerified ? 'YES' : 'NO'
        }));
      setUsers(formattedUsers);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <button onClick={fetchUsers} className="refresh-btn">
        Refresh Users List
      </button>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User E-mail</th>
              <th>User Verified?</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isVerified}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .admin-panel {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .refresh-btn {
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .users-table {
          width: 100%;
          border-collapse: collapse;
        }
        .users-table th, .users-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .users-table th {
          background-color: #f2f2f2;
        }
        .loading, .error {
          padding: 1rem;
          text-align: center;
        }
        .error {
          color: #ff0000;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;