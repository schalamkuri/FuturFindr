import Typography from "@mui/material/Typography";
import React from "react";
import Container from "react-bootstrap/Container";
import ProviderPlayersPerPosition from "../components/visualizations/ProviderPlayersPerPosition";

const Provider= () => {
  return (
      <Container>
          <Typography
          variant="h2"
          sx={{ textAlign: "center" }}
          style={{
              padding: "15px"
          }}>
              Provider Visualizations
          </Typography>
          <ProviderPlayersPerPosition />
      </Container>
  )
  
}

export default Provider;
