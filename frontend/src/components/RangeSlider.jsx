import React, { useState } from "react";
import { Slider, TextField, Grid } from "@mui/material";

export default function RangeSlider(props) {
  const { min, max, discrete, onChange } = props;
  const [value, setValue] = useState([min, max]);

  const handleSliderChange = (event, value) => {
    setValue(value);
    onChange(value);
  };

  const handleMinChange = (event) => {
    setValue([
      event.target.value === "" ? "" : Number(event.target.value),
      max,
    ]);
    onChange([
      event.target.value === "" ? "" : Number(event.target.value),
      max,
    ]);
  };

  const handleMaxChange = (event) => {
    setValue([
      min,
      event.target.value === "" ? "" : Number(event.target.value),
    ]);
    onChange([
      min,
      event.target.value === "" ? "" : Number(event.target.value),
    ]);
  };

  return (
    <Grid className="d-flex  gap-4">
      <TextField value={value[0]} onChange={handleMinChange} size="small" />
      <Slider
        value={value}
        onChange={handleSliderChange}
        marks={discrete}
        min={min}
        max={max}
      />
      <TextField value={value[1]} onChange={handleMaxChange} size="small" />
    </Grid>
  );
}
