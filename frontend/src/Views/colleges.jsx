import React from "react";
import CollegeCard from "../components/CollegeCard";
import { Grid, Slider, Box } from "@mui/material";
import ut from "../Assets/ut_campus.jpg";
import tamu from "../Assets/tamu.jpeg";
import tcu from "../Assets/tamu.jpeg";

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

  return (
    <>
    <Grid>
      <Grid item xs={6}>
      <Slider
          //getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          //getAriaValueText={valuetext}
        />
      </Grid>
      <Grid xs={6}>
      <Slider
          //getAriaLabel={() => "Temperature range"}
          value={value2}
          onChange={handleChange2}
          valueLabelDisplay="auto"
          //getAriaValueText={valuetext}
        />
      </Grid>
    </Grid>




     


      
      <Box sx={{ width: 300 }}>
        
      </Box>

      <Box>
      <Grid container margin={5} spacing={10} flexDirection={"row"} flexWrap={"wrap"}>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut} />
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>
        <CollegeCard name={"University of Texas at Austin"} tuition={30000} media ={ut}/>

        <CollegeCard name={"Texas A&M University"} tuition={35000} media ={tamu}/>
        <CollegeCard name={"Texas A&M University"} tuition={35000} media ={tamu}/>
        <CollegeCard name={"Texas A&M University"} tuition={35000} media ={tamu}/>
        <CollegeCard name={"Texas A&M University"} tuition={35000} media ={tamu}/>
        <CollegeCard name={"Texas A&M University"} tuition={35000} media ={tamu}/>
        <CollegeCard name={"Texas A&M University"} tuition={35000} media ={tamu}/>

        <CollegeCard name={"Texas Christian University"} tuition={60000} media ={tcu}/>
        <CollegeCard name={"Texas Christian University"} tuition={60000} media ={tcu}/>
        <CollegeCard name={"Texas Christian University"} tuition={60000} media ={tcu}/>
        <CollegeCard name={"Texas Christian University"} tuition={60000} media ={tcu}/>
        <CollegeCard name={"Texas Christian University"} tuition={60000} media ={tcu}/>
        <CollegeCard name={"Texas Christian University"} tuition={60000} media ={tcu}/>
        <CollegeCard name={"Texas Christian University"} tuition={60000} media ={tcu}/>
      </Grid>
        
      </Box>
    </>
  );
}

export default Colleges;
