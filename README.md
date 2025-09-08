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

## Project Structure

### Frontend 
src/
├─ components/
│ ├─ Navbar.jsx
│ ├─ ThemeToggle.jsx
│ ├─ BookEvent.jsx
├─ pages/
│ ├─ Home.jsx
│ ├─ EventList.jsx
│ ├─ AdminEvents.jsx
│ ├─ auth/
│ ├─ Login.jsx
│ ├─ Register.jsx
├─ services/
│ ├─ api.js
│ ├─ auth.js
├─ theme/
│ ├─ theme.js
│ ├─ ThemeProvider.jsx
├─ App.jsx
├─ main.jsx



### Backend (`src/main/java/com/vibesta`)
com.vibesta/
├─ config/
│ ├─ SecurityConfig.java
│ ├─ JwtFilter.java
├─ controller/
│ ├─ AuthController.java
│ ├─ EventController.java
│ ├─ FeedbackController.java
├─ model/
│ ├─ User.java
│ ├─ Event.java
│ ├─ Feedback.java
│ ├─ AuthRequest.java
├─ repository/
│ ├─ UserRepository.java
│ ├─ EventRepository.java
│ ├─ FeedbackRepository.java
├─ service/
│ ├─ UserService.java
│ ├─ EventService.java
│ ├─ FeedbackService.java
│ ├─ MyUserDetailsService.java
│ ├─ MyUserDetails.java
├─ util/
│ ├─ JwtUtil.java
└─ VibestaApplication.java

yaml
Copy code
