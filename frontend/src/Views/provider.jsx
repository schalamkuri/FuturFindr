import Typography from "@mui/material/Typography";
import React from "react";
import Container from "react-bootstrap/Container";
import AvgCategoryMinSalary from "../components/visualizations/AvgCategoryMinSalary";
import JobsPerCategory from "../components/visualizations/JobsPerCategory";
import AvgTuition from "../components/visualizations/AvgTuition";

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
          <JobsPerCategory></JobsPerCategory>
          <AvgCategoryMinSalary />
          <AvgTuition />
          {/* <ProviderFoodCategoryCount />
          <ProviderAvgFoodCategorySold />
          <ProviderMarketsPerState /> */}
      </Container>
  )
  
}

export default Provider;
