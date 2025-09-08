import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";
import axios from "../services/api";

const MyFeedback = () => {
  const theme = useTheme();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      axios
        .get(`/api/feedback/user/${email}`)
        .then((res) => setFeedbacks(res.data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        p: 4,
      }}
    >
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Typography
          variant="h4"
          gutterBottom
          color={theme.palette.mode === "dark" ? "white" : "black"}
        >
          My Feedback
        </Typography>

        {feedbacks.map((fb) => (
          <Card
            key={fb.id}
            sx={{
              mb: 3,
              p: 2,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(0,0,0,0.7)"
                  : "rgba(255,255,255,0.85)",
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Typography variant="body1" fontWeight="bold">
                Question: {fb.question}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Admin Response: {fb.response || "Pending..."}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MyFeedback;
