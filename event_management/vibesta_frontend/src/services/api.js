import axios from "axios";

const API_URL = "http://localhost:8080";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginUser = (email, password) => api.post("/auth/login", { email, password });
export const registerUser = (email, password) => api.post("/auth/register", { email, password });
export const registerAdmin = (email, password) => api.post("/auth/register-admin", { email, password });

// Events
export const getEvents = () => api.get("/events"); // ✅ must exist
export const createEvent = (eventData) => api.post("/admin/events/add", eventData);
export const updateEvent = (id, eventData) => api.put(`/admin/events/${id}`, eventData);
export const deleteEvent = (id) => api.delete(`/admin/events/${id}`);
// Get current user's bookings
export const getUserBookings = () => api.get("/events/bookings");


// Bookings
export const bookEvent = (eventUniqueNumber, tickets) =>
  api.post(`/events/${eventUniqueNumber}/book?tickets=${tickets}`);

// Cancel a booking for a user by event unique number
export const cancelBooking = (eventUniqueNumber) =>
  api.delete(`/events/${eventUniqueNumber}/cancel`);

// User submits feedback
export const submitFeedback = (feedback) => api.post("/api/feedback/submit", feedback);

// Admin fetch all feedback
export const getAllFeedback = () => api.get("/api/feedback/all");

// Admin respond
export const respondFeedback = (id, response) =>
  api.put(`/api/feedback/respond/${id}`, { response });




export default api;
