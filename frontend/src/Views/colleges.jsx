import React, { useState, useEffect, useRef } from "react";
import { backendApi } from "../Assets/Data/Constants";
import CollegeCard from "../components/CollegeCard";
//import Pagination from 'react-bootstrap/Pagination';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Spinner from 'react-bootstrap/Spinner';
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";

import {
  Spinner,
  Pagination,
  Row,
  Col,
  Button,
  Form,
  Container,
  InputGroup,
} from "react-bootstrap";

function Colleges() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [collegeList, setColleges] = useState([]);
  const [load, setLoad] = useState(false);
  const [regex, setRegex] = useState(null);
  const postsPerPage = 12;
  const [totalColleges, setTotalColleges] = useState(4000)

  const searchQuery = useRef("");

  // Indexes
  var indexOfLastPost =
    currentPage * postsPerPage < totalColleges
      ? currentPage * postsPerPage
      : totalColleges;
  var indexOfFirstPost = indexOfLastPost - postsPerPage;

  const getColleges = async () => {
    try {
      if (!load) {
        var endpoint;
        if (searchQuery.current.value != "") {
          endpoint = `search/college/${searchQuery.current.value}`;
          setRegex(new RegExp(searchQuery.current.value.replaceAll(" ", "|"), "i"));
          const data = await backendApi.get(endpoint);
          setColleges(data.data.data);
          setTotalColleges(data.data.data.length)
        } else {
          endpoint = "colleges?page=" + currentPage + "&per_page=" + postsPerPage;
          setRegex(null);
          const data = await backendApi.get(endpoint);
          setColleges(data.data.data);
          setTotalColleges(4000)
        }
        setLoad(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getColleges();
  }, [collegeList, load]);

  // Create intermediate pages
  let numPages = Math.ceil(totalColleges / postsPerPage);
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
    setLoad(false)
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
          placeholder="Search Colleges"
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
              {collegeList.map((data) => {
                return (
                  <Col sm={3} key={data.id}>
                    <CollegeCard
                      id={data.id}
                      name={data.name}
                      instateTuition={data.instate_tuition}
                      outstateTuition={data.outstate_tuition}
                      img_url={
                        data.img_url
                          ? data.img_url
                          : "https://www.convergemedia.org/wp-content/uploads/2017/01/academia-1000.png"
                      }
                      admissionRate={data.admission_rate}
                      city={data.city}
                      regex = {regex}
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
              {totalColleges}
            </p>
          </>
        ) : (
          <Spinner animation="border" variant="info" />
        )}
      </div>
    </>
  );
}

export default Colleges;
