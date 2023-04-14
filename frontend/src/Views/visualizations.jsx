import Typography from "@mui/material/Typography";
import React from "react";
import Container from "react-bootstrap/Container";
import AvgCategoryMinSalary from "../components/visualizations/AvgCategoryMinSalary";
import JobsPerCategory from "../components/visualizations/JobsPerCategory";
import AvgTuition from "../components/visualizations/AvgTuition";

const Visualizations = () => {
  return (
      <Container>
          <Typography
          variant="h2"
          sx={{ textAlign: "center" }}
          style={{
              padding: "15px"
          }}>
              Visualizations
          </Typography>
          <JobsPerCategory></JobsPerCategory>
          <AvgCategoryMinSalary />
          <AvgTuition />
      </Container>
  )
  
}

export default Visualizations;
