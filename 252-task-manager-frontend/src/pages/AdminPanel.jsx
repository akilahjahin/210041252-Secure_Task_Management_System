// import { useState, useEffect } from "react";
// import axios from "axios";

// function AdminPanel() {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         axios
//             .get("http://localhost:5000/api/admin/users", { headers: { Authorization: localStorage.getItem("token") } })
//             .then((res) => setUsers(res.data))
//             .catch((err) => console.error(err));
//     }, []);

//     return (
//         <div>
//             <h2>Admin Panel</h2>
//             <ul>
//                 {users.map((user) => (
//                     <li key={user._id}>{user.name} ({user.role})</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default AdminPanel;
import React from 'react';

export default function AdminPanel() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Manage users and tasks here (coming soon).</p>
    </div>
  );
}