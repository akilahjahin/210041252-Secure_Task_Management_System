// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             const decoded = jwtDecode(token);
//             setUser(decoded);
//         }
//     }, []);

//     const login = (token) => {
//         localStorage.setItem("token", token);
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//         navigate("/dashboard");
//     };

//     const logout = () => {
//         localStorage.removeItem("token");
//         setUser(null);
//         navigate("/login");
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;
import React, { createContext, useState } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res) setUser(res);
    return !!res;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}