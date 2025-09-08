import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material";

const sampleEvents = [
  {
    name: "Music Festival",
    details: "Live bands, DJs, and non-stop vibes 🎶",
    date: "2025-09-20",
    remaining: 200,
    image:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Tech Conference",
    details: "Future of AI, Cloud, and Startups 🚀",
    date: "2025-10-02",
    remaining: 150,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Food Carnival",
    details: "Street food, gourmet, and desserts 🍔🍦",
    date: "2025-09-15",
    remaining: 300,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Comedy Night",
    details: "Stand-up specials & open mic 😂",
    date: "2025-09-18",
    remaining: 80,
    image:
      "https://images.unsplash.com/photo-1529472119196-cb724127a98e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Art Exhibition",
    details: "Paintings, sculptures & digital art 🎨",
    date: "2025-09-25",
    remaining: 120,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Startup Pitch Day",
    details: "Innovators pitching their ideas 💡",
    date: "2025-10-05",
    remaining: 60,
    image:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dance Workshop",
    details: "Hip-hop, Salsa & Contemporary 💃",
    date: "2025-09-28",
    remaining: 90,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sports Tournament",
    details: "Cricket, Football & more 🏏⚽",
    date: "2025-09-30",
    remaining: 250,
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Film Screening",
    details: "Indie films & director Q&A 🎬",
    date: "2025-09-22",
    remaining: 100,
    image:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cultural Fest",
    details: "Dance, Music & Traditions 🌍",
    date: "2025-10-10",
    remaining: 400,
    image:
      "https://images.unsplash.com/photo-1521302200778-33500795e128?auto=format&fit=crop&w=800&q=80",
  },
];

const Home = () => {
  const theme = useTheme();

  const handleClick = () => {
    alert("Please register or login to continue.");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        p: 4,
      }}
    >
      {/* Overlay box that adapts to theme */}
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.6)"
              : "rgba(255,255,255,0.85)",
          borderRadius: 3,
          p: 4,
          boxShadow: 4,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          color="text.primary"
          sx={{ textShadow: "1px 1px 3px rgba(0,0,0,0.4)" }}
        >
          Welcome to Vibesta 🎉
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mb: 4, textShadow: "0.5px 0.5px 2px rgba(0,0,0,0.3)" }}
          color="text.primary"
        >
          Discover and book amazing events near you. Sign up to start your
          journey!
        </Typography>

        {/* Horizontal Scrollable Cards */}
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 3,
            pb: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {sampleEvents.map((event, idx) => (
            <Card
              key={idx}
              sx={{
                minWidth: 280,
                flexShrink: 0,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                borderRadius: 3,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(30,30,30,0.9)"
                    : theme.palette.background.paper,
              }}
            >
              <CardActionArea onClick={handleClick}>
                <CardMedia
                  component="img"
                  height="160"
                  image={event.image}
                  alt={event.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="text.primary">
                    {event.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    {event.details}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }} color="text.primary">
                    📅 {event.date}
                  </Typography>
                  <Chip label={`Seats: ${event.remaining}`} color="primary" />
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
