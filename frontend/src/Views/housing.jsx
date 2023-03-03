import React, {useState} from "react";
import Container from "react-bootstrap/esm/Container";
import HousingCard from "../components/HousingCard";
import { HousingList } from "../Assets/Data/HousingData";

import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Housing(props) {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  // Get current posts
  var indexOfLastPost = currentPage * postsPerPage;
  var indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = HousingList.slice(indexOfFirstPost, indexOfLastPost);
  var pages = []

  for (let number = 1; number <= Math.ceil(HousingList.length / postsPerPage); number++) {
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
    currentPosts = HousingList.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPage(number);
  }


  // // controls if the text for how many instances there are is shown
  // function subText() {
  //   if (!props.reuse) {
  //     return (
  //       <div style={{marginRight: "20px"}}>
  //         <p class="font-weight-light text-right">{HousingList.length} out of {HousingList.length} instances</p>
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
                  <HousingCard
                    name = {data.name}
                    city = {data.city}
                    beds = {data.beds}
                    baths = {data.baths}
                    price = {data.price}
                    type = {data.type}
                    datePosted = {data.datePosted}
                    image_url = {data.image_url}
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
    </>


    // <div>
    // <Container style={{display: 'flex'}}>
    //   {HousingList.map((data) => {
    //       return (
    //           <HousingCard
    //               name = {data.name}
    //               city = {data.city}
    //               beds = {data.beds}
    //               baths = {data.baths}
    //               price = {data.rent}
    //               type = {data.type}
    //               image_url = {data.image_url}
    //           />
    //       )
    //     })}
    // </Container>
    // {subText()}
    // </div>
  )
}

export default Housing;
