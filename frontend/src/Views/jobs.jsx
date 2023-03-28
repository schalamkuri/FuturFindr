import React, { useState, useEffect, useRef } from "react";
import { backendApi } from "../Assets/Data/Constants";
import JobCard from "../components/JobCard";
import { Spinner, Pagination, Row, Col, Button, Form } from "react-bootstrap";

function Jobs() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsList, setJobs] = useState([]);
  const [load, setLoad] = useState(false);
  const [regex, setRegex] = useState(null);
  const [totalJobs, setTotalJobs] = useState(1947);

  const postsPerPage = 12;
  const searchQuery = useRef("");

  // determine index of the last post
  var indexOfLastPost =
    currentPage * postsPerPage < totalJobs
      ? currentPage * postsPerPage
      : totalJobs;

  // determine index of the first post
  var indexOfFirstPost;
  if (indexOfLastPost - postsPerPage < 0) {
    indexOfFirstPost = totalJobs;
  } else if (currentPage * postsPerPage > totalJobs) {
    indexOfFirstPost = totalJobs - (totalJobs % postsPerPage);
  } else {
    indexOfFirstPost = indexOfLastPost - postsPerPage;
  }

  const getJobs = async () => {
    try {
      if (!load) {
        var endpoint;
        if (searchQuery.current.value != "") {
          endpoint = `search/job/${searchQuery.current.value}?page=${currentPage}&per_page=${postsPerPage}`;
          setRegex(
            new RegExp(searchQuery.current.value.replaceAll(" ", "|"), "i")
          );
          const data = await backendApi.get(endpoint);
          setJobs(data.data.data);
          setTotalJobs(data.data.meta.total);
        } else {
          endpoint = "jobs?page=" + currentPage + "&per_page=" + postsPerPage;
          setRegex(null);
          const data = await backendApi.get(endpoint);
          setJobs(data.data.data);
          setTotalJobs(1947);
        }
        setLoad(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getJobs();
  }, [jobsList, load]);

  // Create intermediate pages
  let numPages = Math.ceil(totalJobs / postsPerPage);
  var pages = [];
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
    setLoad(false);
  }

  return (
    <>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setLoad(false);
        }}
        className="d-flex justify-content-center"
      >
        <Form.Control
          ref={searchQuery}
          style={{ width: "15vw" }}
          type="search"
          placeholder="Search Jobs"
          className="m-2"
          aria-label="Search"
        />
        <Button
          variant="outline-secondary"
          className="m-2"
          onClick={() => setLoad(false)}
        >
          Search
        </Button>
      </Form>
      <div
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {load ? (
          <>
            <Row>
              {jobsList.map((data) => {
                return (
                  <Col sm={3} key={data.id}>
                    <JobCard
                      id={data.id}
                      title={data.title}
                      company={data.company}
                      category={data.category}
                      location={data.city}
                      salaryMin={data.salary_min}
                      salaryMax={data.salary_max}
                      datePosted={data.created}
                      regex={regex}
                      image={
                        data.img_url
                          ? data.img_url
                          : "https://thumbs.dreamstime.com/b/cv-writing-job-application-resume-gray-icon-vector-graphics-various-use-187075464.jpg"
                      }
                    />
                  </Col>
                );
              })}
            </Row>
            <Pagination
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
              Showing instances {indexOfFirstPost}-{indexOfLastPost} out of{" "}
              {totalJobs}
            </p>
          </>
        ) : (
          <Spinner animation="border" variant="info" />
        )}
      </div>
    </>
  );
}

export default Jobs;
