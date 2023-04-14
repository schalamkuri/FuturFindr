import Typography from "@mui/material/Typography";
import React from "react";
import Container from "react-bootstrap/Container";
import AvgCategorySalary from "../components/visualizations/AvgCategorySalary";
import JobsPerCategory from "../components/visualizations/JobsPerCategory";
import TuitionVsAdmission from "../components/visualizations/TuitionVsAdmission";

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
          <AvgCategorySalary />
          <TuitionVsAdmission />
      </Container>
  )
  
}

export default Visualizations;
