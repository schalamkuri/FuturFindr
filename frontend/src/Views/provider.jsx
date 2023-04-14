import Typography from "@mui/material/Typography";
import React from "react";
import Container from "react-bootstrap/Container";
import ProviderPlayersPerPosition from "../components/visualizations/ProviderPlayersPerPosition";
import ProviderEventsPerMonth from "../components/visualizations/ProviderEventsPerMonth";
import ProviderRankVSWLRatio from "../components/visualizations/ProviderRankVSWLRatio";

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
            <a href="https://www.sportsrightnow.me/" target="_blank" rel="noreferrer">
                <h2>Sports Now</h2>
            </a>
          </Typography>
          <ProviderPlayersPerPosition />
          <ProviderEventsPerMonth />
          <ProviderRankVSWLRatio />
      </Container>
  )
  
}

export default Provider;
