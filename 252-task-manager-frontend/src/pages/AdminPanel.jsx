import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <div>
      <h2>All Registered Users</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.email} - Role: {u.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;