import React, {useState} from "react";
import CollegeCard from "../components/CollegeCard";
import { Grid, Slider, Box, Typography } from "@mui/material";
import CollegeList from "../Assets/Data/colleges.json"

import Container from "react-bootstrap/esm/Container";
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// function valuetext(value) {
//   return `${value}°C`;
// }

function Colleges(props) {
  const [value, setValue] = React.useState([20, 37]);
  const [value2, setValue2] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (event, newValue2) => {
    setValue2(newValue2);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  // Get current posts
  var indexOfLastPost = currentPage * postsPerPage;
  var indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = CollegeList.slice(indexOfFirstPost, indexOfLastPost);
  var pages = []

  for (let number = 1; number <= Math.ceil(CollegeList.length / postsPerPage); number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => pagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  function pagination(number) {
    indexOfLastPost = currentPage * postsPerPage;
    indexOfFirstPost = indexOfLastPost - postsPerPage;
    currentPosts = CollegeList.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPage(number);
  }


  // const DisplayData=collegeData.map(
  //   (info)=>{
  //       return(
  //         <Grid item xs={3} >
          // <CollegeCard
          //   id={info.id}
          //   name={info.name}
          //   tuition={info.tuition}
          //   media={info.media}
          //   rank={info.rank}
          //   graduation_rate={info.graduation_rate}
          //   acceptance_rate={info.acceptance_rate}
          //   city={info.city}
          // />
  //       </Grid>
  //       )
  //   }
  // )

  // // controls if the text for how many instances there are is shown
  // function subText() {
  //   if (!props.reuse) {
  //     return (
  //       <div style={{marginRight: "20px"}}>
  //         <p class="font-weight-light text-right">3 out of 3 instances</p>
  //         <p class="font-weight-light text-right">Page 1</p>
  //       </div>
  //     )
  //   } else {
  //     return null
  //   }
  // }

  return (
    <>
     <Container fluid>
        <Row>
          {
            currentPosts.map(data => {
              return (
                <Col sm={4} key={data.id}>
          <CollegeCard
            id={data.id}
            name={data.name}
            tuition={data.tuition}
            media={data.media}
            rank={data.rank}
            graduation_rate={data.graduation_rate}
            acceptance_rate={data.acceptance_rate}
            city={data.city}
          />
                </Col>
              );
            })
          }
        </Row>
      <Pagination style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",}}>
        {pages}
      </Pagination>
      </Container>  



      {/* <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={10} justifyContent="center" marginTop={"0px"}>
          {DisplayData}
        </Grid>

      </Box>
      {subText()} */}
    </>
  );
}

export default Colleges;
