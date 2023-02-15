import React from "react";
import CollegeCard from "../components/CollegeCard";
import { Grid, Slider, Box, Typography } from "@mui/material";
import ut from "../Assets/ut_campus.jpg";
import tamu from "../Assets/tamu.jpeg";
import tcu from "../Assets/tcu.jpeg";
import collegeData from "../Assets/Data/colleges.json"

// function valuetext(value) {
//   return `${value}°C`;
// }

function Colleges() {
  const [value, setValue] = React.useState([20, 37]);
  const [value2, setValue2] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (event, newValue2) => {
    setValue2(newValue2);
  };

  const DisplayData=collegeData.map(
    (info)=>{
        return(
          <Grid item xs={3} >
          <CollegeCard
            id={info.id}
            name={info.name}
            tuition={info.tuition}
            media={info.media}
            rank={info.rank}
            graduation_rate={info.graduation_rate}
            acceptance_rate={info.acceptance_rate}
            city={info.city}
          />
        </Grid>
        )
    }
)

  return (
    <>
      <Grid>
        <Grid item xs={6}>
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid xs={6}>
          <Slider
            value={value2}
            onChange={handleChange2}
            valueLabelDisplay="auto"
          />
        </Grid>
      </Grid>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={10} justifyContent="center">
          {DisplayData}
        </Grid>

      </Box>
    </>
  );
}

export default Colleges;
