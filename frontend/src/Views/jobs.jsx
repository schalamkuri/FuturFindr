import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Container from "react-bootstrap/esm/Container";
import JobCard from "../components/JobCard";
import { JobsList } from "../Assets/Data/JobsData";
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Jobs() {

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [jobs, setJobs] = useState([])

  // const getJobs = async () => {
  //   try {
  //     const data = await axios.get(
  //       //url
  //     )
  //     console.log(data)
  //     setJobs(data.data)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // useEffect(() => {
  //   getJobs()
  // }, [])

  // Get current posts
  var indexOfLastPost = currentPage * postsPerPage;
  var indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = JobsList.slice(indexOfFirstPost, indexOfLastPost);
  var pages = []

  // Make page button for each page
  for (let number = 1; number <= Math.ceil(JobsList.length / postsPerPage); number++) {
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
    currentPosts = JobsList.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPage(number);
  }

  return (
    <>
    <Container fluid>
      <Row>{
        currentPosts.map(data => {
          return (
            <Col sm={3} key={data.id}>
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
      }</Row>
      <Pagination style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",}}>
        {pages}
      </Pagination>
      <p class="font-weight-light text-right">
        Showing instances {indexOfFirstPost}-{indexOfLastPost} out of {JobsList.length}
      </p>
    </Container>  
    </>
  );
}

export default Jobs;
