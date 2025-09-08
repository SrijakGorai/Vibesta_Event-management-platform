# Vibesta 🎉

Vibesta is a full-stack **Event Management System** built with **React (Vite + Material UI)** for the frontend and **Spring Boot** for the backend. Users can browse, book, and give feedback on events, while admins can manage events, view bookings, and manage feedback. The platform supports **JWT-based authentication**, **role-based routing**, and **light/dark themes**.

## Features
### User Features
- Browse available events in a horizontal scrollable card layout.  
- Book tickets for events with max tickets per user restriction.  
- Submit feedback for attended events.  
- View own bookings and cancel if needed.  
- Responsive UI with **theme toggle** (light/dark mode).  

### Admin Features
- Add, edit, or delete events.  
- View all user bookings per event.  
- Manage user feedback.  
- Role-based access control using JWT tokens.  

### General Features
- JWT-based authentication (Login/Register).  
- Responsive Navbar with hamburger menu on mobile.  
- Beautiful gradient logo and Material UI design.  
- Theme-aware cards and containers for light/dark modes.  


## Tech Stack

**Frontend:**  
- React + Vite  
- Material UI  
- React Router v6  
- JWT Authentication  

**Backend:**  
- Spring Boot  
- Spring Security with JWT  
- H2 / MySQL Database  
- RESTful APIs  

**Other:**  
- LocalStorage for storing JWT, role, and email  
- Responsive design (mobile-friendly)  
- Horizontal scrollable cards for events  



