import { Container, Typography } from "@mui/material";

const Unauthorized = () => {
  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" color="error">
        403 - Unauthorized
      </Typography>
      <Typography>You don’t have access to this page.</Typography>
    </Container>
  );
};

export default Unauthorized;
