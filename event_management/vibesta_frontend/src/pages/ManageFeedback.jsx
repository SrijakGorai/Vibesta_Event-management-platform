import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { getAllFeedback, respondFeedback } from "../services/api";

const ManageFeedback = () => {
  const theme = useTheme();
  const [feedbacks, setFeedbacks] = useState([]);
  const [responses, setResponses] = useState({}); // temp responses for each feedback

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await getAllFeedback();
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResponseChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleRespond = async (id) => {
    if (!responses[id]) return;
    try {
      await respondFeedback(id, responses[id]);
      fetchFeedbacks(); // refresh after responding
      setResponses((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        p: 4,
      }}
    >
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Typography
          variant="h4"
          gutterBottom
          color={theme.palette.mode === "dark" ? "white" : "black"}
        >
          Manage Feedback
        </Typography>

        {feedbacks.map((fb) => (
          <Card
            key={fb.id}
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 3,
              backdropFilter: "blur(10px)",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(0,0,0,0.5)"
                  : "rgba(255,255,255,0.4)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            <CardContent>
              <Typography variant="body1" fontWeight="bold">
                User: {fb.email}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                Question: {fb.question}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Response: {fb.response || "Pending..."}
              </Typography>

              <TextField
                placeholder="Type response..."
                fullWidth
                value={responses[fb.id] || ""}
                onChange={(e) =>
                  handleResponseChange(fb.id, e.target.value)
                }
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.7)",
                  borderRadius: 2,
                  mt: 1,
                }}
              />
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => handleRespond(fb.id)}
              >
                Respond
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ManageFeedback;
