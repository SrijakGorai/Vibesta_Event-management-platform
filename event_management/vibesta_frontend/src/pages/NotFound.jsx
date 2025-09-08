import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" gutterBottom>
        The page you are looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
