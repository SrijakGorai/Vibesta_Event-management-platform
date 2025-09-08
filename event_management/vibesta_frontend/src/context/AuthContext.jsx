// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || null,
    email: localStorage.getItem("email") || null,
    role: localStorage.getItem("role") || null,
  });

  // Keep localStorage in sync whenever auth state changes
  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("token", auth.token);
      localStorage.setItem("email", auth.email);
      localStorage.setItem("role", auth.role);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
    }
  }, [auth]);

  const login = (token, email, role) => {
    setAuth({ token, email, role });
  };

  const logout = () => {
    setAuth({ token: null, email: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
