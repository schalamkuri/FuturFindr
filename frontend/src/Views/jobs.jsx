import React, { useState } from 'react';
import Container from "react-bootstrap/esm/Container";
import JobCard from "../components/JobCard";
import { JobsList } from "../Assets/Data/JobsData";
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Jobs = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  // Get current posts
  var indexOfLastPost = currentPage * postsPerPage;
  var indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = JobsList.slice(indexOfFirstPost, indexOfLastPost);
  var pages = []

  for (let number = 1; number <= Math.ceil(JobsList.length / postsPerPage); number++) {
    pages.push(
      <Pagination.Item
        key={number}
        currentPage={number === currentPage}
        onClick={() => pagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  function pagination(number) {
    indexOfLastPost = currentPage * postsPerPage;
    indexOfFirstPost = indexOfLastPost - postsPerPage;
    currentPosts = JobsList.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPage(number);
  }

  return (
    <>
      <Container fluid>
        <Row>
          {
            currentPosts.map(data => {
              return (
                <Col sm={4} key={data.id}>
                  <JobCard
                    listing = {data.listing}
                    company = {data.company}
                    id = {data.id}
                    industry = {data.industry}
                    location = {data.location}
                    pay = {data.pay}
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
    //   {currentPosts.map((data) => {
    //       return (
    //           <JobCard
    //               listing = {data.listing}
    //               company = {data.company}
    //               id = {data.id}
    //               industry = {data.industry}
    //               location = {data.location}
    //               pay = {data.pay}
    //               datePosted = {data.datePosted}
    //               image_url = {data.image_url}
    //           />
    //       )
    //     })}
    // </Container>
    // <Pagination 
      // postsPerPage={postsPerPage}
      // totalPosts={JobsList.length}
      // paginate={paginate}
    // />
    // {/* {subText()} */}
    // </div>
  );
}

export default Jobs;
