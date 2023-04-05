import Typography from "@mui/material/Typography";
function Visualizations() {
  return (
    <Typography>
      
      <div>
      {/* <h1>Visualizations</h1> */}
       <iframe
  width="600"
  height="450"
  style="border:0"
  loading="lazy"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA9kS5d3pbtHba18DDfLWZkAxDOe6N04EY&q=Space+Needle,Seattle+WA`}>
</iframe>
    </div>
    </Typography>

  );
}
export default Visualizations;