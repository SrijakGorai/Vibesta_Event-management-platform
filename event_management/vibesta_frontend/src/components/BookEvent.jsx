import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { bookEvent } from "../services/api";

const BookEvent = ({ event }) => {
  const [tickets, setTickets] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticketsInt = parseInt(tickets, 10);

    if (ticketsInt <= 0) {
      alert("You must enter at least 1 ticket");
      return;
    }

    if (ticketsInt > event.remainingTickets) {
      alert(`Only ${event.remainingTickets} tickets are available`);
      return;
    }

    if (ticketsInt > event.maxTicketsPerUser) {
      alert(`You can book maximum ${event.maxTicketsPerUser} tickets per user`);
      return;
    }

    try {
      await bookEvent(event.eventUniqueNumber, ticketsInt);
      alert("Booking successful!");
      setTickets(""); // Reset input after booking
    } catch (err) {
      console.error(err);
      alert("Booking failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h6">{event.eventName}</Typography>
      <Typography>Remaining Tickets: {event.remainingTickets}</Typography>
      <Typography>Max Tickets Per User: {event.maxTicketsPerUser}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tickets Required"
          type="number"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
          fullWidth
          margin="normal"
          inputProps={{
            min: 1,
            max: Math.min(event.remainingTickets, event.maxTicketsPerUser),
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Book Tickets
        </Button>
      </form>
    </Container>
  );
};

export default BookEvent;
