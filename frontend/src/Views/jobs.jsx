import React, { useState, useEffect } from 'react';
import {backendApi} from "../Assets/Data/Constants"
import JobCard from "../components/JobCard";
// import Pagination from 'react-bootstrap/Pagination';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Spinner from 'react-bootstrap/Spinner';

import { Spinner, Pagination, Row, Col, Button, Form, Container, InputGroup } from "react-bootstrap";

function Jobs() {

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsList, setJobs] = useState([]);
  const [load, setLoad] = useState(false);
  const postsPerPage = 12;
  const totalJobs  = 1947;

  // Indexes
  var indexOfLastPost = currentPage * postsPerPage < totalJobs ?
    currentPage * postsPerPage : totalJobs;
  var indexOfFirstPost = indexOfLastPost - postsPerPage;

  const getJobs = async () => {
    try {
      var endpoint = 'jobs?page='+ currentPage + '&per_page=' + postsPerPage
      const data = await backendApi.get(
        endpoint
      )
      setJobs(data.data.data)
      setLoad(true)
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    getJobs()
  }, [jobsList, load])


  // Create intermediate pages
  let numPages = Math.ceil(totalJobs / postsPerPage)
  var pages = []
  for (let number = currentPage - 1; number <= currentPage + 1; number++) {
    if (number > 0 && number <= numPages) {
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
  }

  // On click function for paginator
  function pagination(number) {
    setCurrentPage(number);
  }

  return (
    <>
            {/* <Container fluid>
    <Form onSubmit={(event) => {
          event.preventDefault();
          setLoad(false);
        }}
        className="d-flex pb-5 justify-content-center"
        >
      <Form.Control
          ref={searchQuery}
          style={{ width: "20vw" }}
          type="search"
          placeholder="Search Colleges"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-secondary" className="mb-2" onClick={() => setLoad(false)}>
          Search
        </Button>

    </Form>
    </Container> */}
      <Form>
      <Row className="d-flex justify-content-center">
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" visuallyHidden>
            College
          </Form.Label>
          <Form.Control
            className="m-2"
            id="inlineFormInput"
            placeholder="Search Jobs"
          />
        </Col>
        <Col xs="auto">
          <Button type="submit" className="m-2" onClick={() => setLoad(false)}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
    <div style={{
      display: "block",
      marginLeft: "auto",
      marginRight: "auto"  }}>
      {load ? (
        <>
        <Row>{
          jobsList.map(data => {
            return (
              <Col sm={3} key={data.id}>
                <JobCard
                  id = {data.id}
                  title = {data.title}
                  company = {data.company}
                  category = {data.category}
                  location = {data.city}
                  salaryMin = {data.salary_min}
                  salaryMax = {data.salary_max}
                  datePosted = {data.created}
                  image = {data.img_url ? data.img_url :
                    "https://thumbs.dreamstime.com/b/cv-writing-job-application-resume-gray-icon-vector-graphics-various-use-187075464.jpg"}
                />
              </Col>
            );
          })
        }</Row>
        <Pagination style = {{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"}}>
          {currentPage > 2 && (
            <Pagination.Item
              key={1}
              onClick={() => pagination(1)}
              active={1 === currentPage}
            >
              1
            </Pagination.Item>
          )}
          {currentPage > 3 && <Pagination.Ellipsis />}
          {pages}
          {currentPage < numPages - 3 && <Pagination.Ellipsis />}
          {currentPage < numPages - 2 && (
            <Pagination.Item
              key={numPages}
              onClick={() => pagination(numPages)}
              active={numPages === currentPage}
            >
              {numPages}
            </Pagination.Item>
          )}
        </Pagination>
        <p className="font-weight-light text-right">
          Showing instances {indexOfFirstPost}-{indexOfLastPost} out of {totalJobs}
        </p>
        </>
      ): (<Spinner animation="border" variant="info"/>)}
  </div>
  </>
  );
}

export default Jobs;
