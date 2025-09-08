import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Unauthorized from "./pages/Unauthorized";
import AdminEvents from "./pages/AdminEvents";
import EventList from "./pages/EventList";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import SubmitFeedback from "./pages/SubmitFeedback";
import MyFeedback from "./pages/MyFeedback"; // <-- add this
import ManageFeedback from "./pages/ManageFeedback";

// inside <Routes>







const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>


        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback/submit" element={<SubmitFeedback />} />
<Route path="/admin/feedback" element={<ManageFeedback />} />
<Route
  path="/feedback/my"
  element={
    <ProtectedRoute allowedRoles={["USER"]}>
      <MyFeedback />
    </ProtectedRoute>
  }
/>



        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <EventList />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
       <Footer />
    </Router>
  );
};

export default App;
