import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 6,
        py: 3,
        textAlign: "center",
        bgcolor: "primary.main",
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontFamily: "'Great Vibes', cursive" }}>
        Vibesta
      </Typography>

      {/* Social icons */}
      <Box sx={{ mb: 1 }}>
        <IconButton color="inherit" href="https://facebook.com" target="_blank">
          <Facebook />
        </IconButton>
        <IconButton color="inherit" href="https://twitter.com" target="_blank">
          <Twitter />
        </IconButton>
        <IconButton color="inherit" href="https://instagram.com" target="_blank">
          <Instagram />
        </IconButton>
        <IconButton color="inherit" href="https://youtube.com" target="_blank">
          <YouTube />
        </IconButton>
      </Box>

      <Typography variant="body2">
        © {new Date().getFullYear()} Vibesta. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
