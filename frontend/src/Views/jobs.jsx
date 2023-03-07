import React, { useState, useEffect } from 'react';
import {backendApi} from "../Assets/Data/Constants"
import JobCard from "../components/JobCard";
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

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
                  image_url = {data.url}
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
