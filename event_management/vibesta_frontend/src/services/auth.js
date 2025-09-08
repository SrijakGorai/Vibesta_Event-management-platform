// src/services/auth.js
import api from "./api";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("email", res.data.email);
  }
  return res.data;
};

export const register = async (email, password) => {
  return api.post("/auth/register", { email, password });
};

export const registerAdmin = async (email, password) => {
  return api.post("/auth/register-admin", { email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
};
