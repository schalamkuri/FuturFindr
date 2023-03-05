import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import HousingCard from "../components/HousingCard";
import { HousingList } from "../Assets/Data/HousingData";
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Housing() {

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // Get current posts
  var indexOfLastPost = currentPage * postsPerPage;
  var indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = HousingList.slice(indexOfFirstPost, indexOfLastPost);
  var pages = []

  // Make page button for each page
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

  // On click funtion for paginator
  function pagination(number) {
    indexOfLastPost = currentPage * postsPerPage;
    indexOfFirstPost = indexOfLastPost - postsPerPage;
    currentPosts = HousingList.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPage(number);
  }



  return (
    <>
    <Container fluid>
      <Row>{
        currentPosts.map(data => {
          return (
            <Col sm={3} key={data.id}>
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
      }</Row>
      <Pagination style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",}}>
        {pages}
      </Pagination>
      <p class="font-weight-light text-right">
        Showing instances {indexOfFirstPost}-{indexOfLastPost} out of {HousingList.length}
      </p>
    </Container>  
    </>
  )
}

export default Housing;
