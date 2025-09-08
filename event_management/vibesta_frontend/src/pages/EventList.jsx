import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid,
} from "@mui/material";
import { getEvents, getUserBookings, cancelBooking } from "../services/api";
import BookEvent from "../components/BookEvent";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const res = await getUserBookings();
      setMyBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  const handleCancel = async (eventUniqueNumber) => {
    try {
      await cancelBooking(eventUniqueNumber);
      alert("Booking cancelled");
      fetchMyBookings();
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel booking");
    }
  };

  useEffect(() => {
    fetchEvents();
    if (localStorage.getItem("role") === "USER") fetchMyBookings();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        p: 4,
      }}
    >
      <Box
  sx={(theme) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(0,0,0,0.7)"   // darker overlay in dark mode
        : "rgba(255,255,255,0.85)", // light overlay in light mode
    borderRadius: 3,
    p: 4,
    boxShadow: 4,
  })}
>
        {/* 🎉 Available Events */}
        <Typography variant="h4" gutterBottom fontWeight="bold">
          🎉 Available Events
        </Typography>

        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 3,
            pb: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {events.map((event) => (
            <Card
              key={event.eventUniqueNumber}
              sx={{
                minWidth: 280,
                flex: "0 0 auto",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)", boxShadow: 6 },
                borderRadius: 3,
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {event.eventName}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  {event.eventDetails}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  📅 Date: {event.eventDate}
                </Typography>
                <Chip
                  label={`Remaining: ${event.remainingTickets}`}
                  color="primary"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2">
                  Max/User: {event.maxTicketsPerUser}
                </Typography>
              </CardContent>
              <CardActions>
                {localStorage.getItem("role") === "USER" && (
                  <BookEvent event={event} />
                )}
              </CardActions>
            </Card>
          ))}
        </Box>

        {/* 🎟️ My Bookings */}
        {localStorage.getItem("role") === "USER" && (
          <Box mt={6}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              🎟️ My Bookings
            </Typography>
            {myBookings.length === 0 ? (
              <Typography>No bookings yet.</Typography>
            ) : (
              <Grid container spacing={3}>
                {myBookings.map((booking) => (
                  <Grid item xs={12} sm={6} md={4} key={booking.id}>
                    <Card
                      sx={(theme) => ({
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        transition: "0.3s",
                        "&:hover": { transform: "scale(1.02)", boxShadow: 4 },
                        borderRadius: 3,
                      })}
                    >
                      <CardContent>
                        <Typography variant="h6">
                          {booking.event.eventName}
                        </Typography>
                        <Typography color="text.secondary">
                          Tickets: {booking.ticketsBooked}
                        </Typography>
                        <Typography>
                          📅 Date: {booking.event.eventDate}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          color="error"
                          variant="contained"
                          onClick={() =>
                            handleCancel(booking.event.eventUniqueNumber)
                          }
                        >
                          Cancel Booking
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EventList;
