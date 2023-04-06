import Typography from "@mui/material/Typography";
import React from "react";
import Container from "react-bootstrap/Container";
import AvgCategoryMinSalary from "../components/visualizations/AvgCategoryMinSalary";
import JobsPerCategory from "../components/visualizations/JobsPerCategory";

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
          {/* <AvgCityAparmentPrice></AvgCityAparmentPrice> */}
          <AvgCategoryMinSalary />
          <Typography
          variant="h3"
          sx={{ textAlign: "center" }}
          style={{
              padding: "15px"
          }}>
              Provider Visualizations
          </Typography>
          {/* <ProviderFoodCategoryCount />
          <ProviderAvgFoodCategorySold />
          <ProviderMarketsPerState /> */}
      </Container>
  )
  
}

export default Visualizations;
