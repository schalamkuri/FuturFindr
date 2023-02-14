import React from "react";
import CollegeCard from "../components/CollegeCard";
import { Grid, Slider, Box } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

function Colleges() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>

      <Grid container margin={5} spacing={5} flexDirection={"row"} flexWrap={"wrap"}>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} />

        <CollegeCard name={"Texas A&M University"} tuition={35000} />
        <CollegeCard name={"Texas A&M University"} tuition={35000} />
        <CollegeCard name={"Texas A&M University"} tuition={35000} />
        <CollegeCard name={"Texas A&M University"} tuition={35000} />
        <CollegeCard name={"Texas A&M University"} tuition={35000} />
        <CollegeCard name={"Texas A&M University"} tuition={35000} />

        <CollegeCard name={"Texas Christian University"} tuition={60000} />
        <CollegeCard name={"Texas Christian University"} tuition={60000} />
        <CollegeCard name={"Texas Christian University"} tuition={60000} />
        <CollegeCard name={"Texas Christian University"} tuition={60000} />
        <CollegeCard name={"Texas Christian University"} tuition={60000} />
        <CollegeCard name={"Texas Christian University"} tuition={60000} />
        <CollegeCard name={"Texas Christian University"} tuition={60000} />
      </Grid>
    </>
  );
}

export default Colleges;
