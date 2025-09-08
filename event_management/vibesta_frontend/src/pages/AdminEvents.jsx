import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Paper,
  Divider,
  Stack,
  Grid,
  useTheme,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/api";

const AdminEvents = () => {
  const theme = useTheme();
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    eventDetails: "",
    eventDate: "",
    totalTickets: "",
    maxTicketsPerUser: "",
    eventUniqueNumber: "",
  });

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleNewChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = async () => {
    try {
      const payload = {
        ...newEvent,
        totalTickets: parseInt(newEvent.totalTickets, 10),
        remainingTickets: parseInt(newEvent.totalTickets, 10),
        maxTicketsPerUser: parseInt(newEvent.maxTicketsPerUser, 10),
      };
      await createEvent(payload);
      alert("Event added!");
      setNewEvent({
        eventName: "",
        eventDetails: "",
        eventDate: "",
        totalTickets: "",
        maxTicketsPerUser: "",
        eventUniqueNumber: "",
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Failed to add event");
    }
  };

  const handleEdit = (event) => {
    setEditId(event.id);
    setEditData({
      eventName: event.eventName,
      eventDetails: event.eventDetails,
      eventDate: event.eventDate,
      totalTickets: event.totalTickets,
      maxTicketsPerUser: event.maxTicketsPerUser,
    });
  };

  const handleUpdate = async () => {
    try {
      const bookedTickets =
        events.find((e) => e.id === editId).totalTickets -
        events.find((e) => e.id === editId).remainingTickets;

      const payload = {
        ...editData,
        totalTickets: parseInt(editData.totalTickets, 10),
        remainingTickets: parseInt(editData.totalTickets, 10) - bookedTickets,
        maxTicketsPerUser: parseInt(editData.maxTicketsPerUser, 10),
      };

      await updateEvent(editId, payload);
      setEditId(null);
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          theme.palette.mode === "dark"
            ? "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1525362081669-2b476bb628c3?auto=format&fit=crop&w=1600&q=80')"
            : "linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        p: 4,
      }}
    >
      {/* Add Event Form */}
      <Paper sx={{ p: 3, mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Add New Event
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {Object.keys(newEvent).map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1")}
                name={field}
                type={
                  field.toLowerCase().includes("date")
                    ? "date"
                    : field.toLowerCase().includes("tickets")
                    ? "number"
                    : "text"
                }
                value={newEvent[field]}
                onChange={handleNewChange}
                fullWidth
                InputLabelProps={
                  field.toLowerCase().includes("date")
                    ? { shrink: true }
                    : undefined
                }
              />
            </Grid>
          ))}
        </Grid>
        <Button
          onClick={handleAddEvent}
          variant="contained"
          startIcon={<Add />}
          sx={{ mt: 3 }}
        >
          Add Event
        </Button>
      </Paper>

      {/* Manage Events */}
      <Typography variant="h4" gutterBottom>
        Manage Events
      </Typography>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 3,
          scrollSnapType: "x mandatory",
          p: 1,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {events.map((event) => (
          <Card
            key={event.eventUniqueNumber}
            sx={{
              minWidth: 300,
              maxWidth: 350,
              flexShrink: 0,
              boxShadow: 4,
              borderRadius: 3,
              scrollSnapAlign: "start",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80"
              alt="Event"
            />
            <CardContent>
              {editId === event.id ? (
                <>
                  {/* Edit Form */}
                  <TextField
                    label="Event Name"
                    value={editData.eventName}
                    onChange={(e) =>
                      setEditData({ ...editData, eventName: e.target.value })
                    }
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Details"
                    value={editData.eventDetails}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        eventDetails: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    type="date"
                    label="Date"
                    value={editData.eventDate}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        eventDate: e.target.value,
                      })
                    }
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <Stack direction="row" spacing={2} mt={2}>
                    <Button
                      onClick={handleUpdate}
                      variant="contained"
                      color="success"
                    >
                      Save
                    </Button>
                    <Button onClick={() => setEditId(null)} color="inherit">
                      Cancel
                    </Button>
                  </Stack>
                </>
              ) : (
                <>
                  {/* Display Mode */}
                  <Typography variant="h6">{event.eventName}</Typography>
                  <Typography color="text.secondary">
                    {event.eventDetails}
                  </Typography>
                  <Typography>Date: {event.eventDate}</Typography>
                  <Typography>
                    Tickets: {event.remainingTickets}/{event.totalTickets}
                  </Typography>
                  <Typography>
                    Max/User: {event.maxTicketsPerUser}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={2}>
                    <Button
                      onClick={() => handleEdit(event)}
                      variant="outlined"
                      startIcon={<Edit />}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(event.id)}
                      color="error"
                      variant="outlined"
                      startIcon={<Delete />}
                    >
                      Delete
                    </Button>
                  </Stack>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AdminEvents;
