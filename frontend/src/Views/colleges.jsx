import React, { useState, useEffect, useRef } from "react";
import Select from 'react-select';
import { backendApi } from "../Assets/Data/Constants";
import CollegeCard from "../components/CollegeCard";
import RangeSlider from "../components/RangeSlider";
import FilterDropdown from "../components/FilterDropdown";
import {
  Spinner,
  Pagination,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import { citiesFilterOptions } from "../Assets/Data/CitiesFilter";

function Colleges() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [collegeList, setColleges] = useState([]);
  const [load, setLoad] = useState(false);
  const [regex, setRegex] = useState(null);
  const [totalColleges, setTotalColleges] = useState(4000);

  const [sort, setSort] = useState("sort");
  const [ascending, setAscending] = useState(true);
  const [city, setCity] = useState("city");
  const [i_tuition, setItuition] = useState([0, 1000000]);
  const [o_tuition, setOtuition] = useState([0, 1000000]);
  const [admission, setAdmission] = useState([0, 1000000]);


  const postsPerPage = 12;
  const searchQuery = useRef("");

  // determine index of the last post
  var indexOfLastPost =
    currentPage * postsPerPage < totalColleges
      ? currentPage * postsPerPage
      : totalColleges;

  // determine index of the first post
  var indexOfFirstPost;
  if (indexOfLastPost - postsPerPage < 0) {
    indexOfFirstPost = totalColleges;
  } else if (currentPage * postsPerPage > totalColleges) {
    indexOfFirstPost = totalColleges - (totalColleges % postsPerPage);
  } else {
    indexOfFirstPost = indexOfLastPost - postsPerPage;
  }

  // handle state for filtering parameters
  const handleSortFilter = (value) => {
    setSort(value.toLowerCase().replace(" ", "_"));
  };

  const handleOrderFilter = (value) => {
    setAscending(value == "Ascending");
  };

  const handleCityFilter = (value) => {
    console.log(value.value)
    setCity(value.value)
  }

  const handleItuitionFilter = (value) => {
    setItuition(value);
  };

  const handleOtuitionFilter = (value) => {
    setOtuition(value);
  };

  const handleAdmissionFilter = (value) => {
    setAdmission(value);
  };

  function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  const getColleges = async () => {
    try {
      if (!load) {
        // value of the api call
        var endpoint;

        // if searchiing
        if (searchQuery.current.value != "") {
          // set endpoint to search this model with the query
          endpoint = `search/college/${searchQuery.current.value}?page=${currentPage}&per_page=${postsPerPage}`;
          // set regular expression for highlighting
          setRegex(
            new RegExp(searchQuery.current.value.replaceAll(" ", "|"), "i")
          );
          // get data and set size for pagination
          const data = await backendApi.get(endpoint);
          setColleges(data.data.data);
          setTotalColleges(data.data.meta.total);
        } else {
          // default to just paging 
          endpoint =
            "colleges?page=" + currentPage + "&per_page=" + postsPerPage;
          // make sure there are no highlights from a previous search
          setRegex(null);

          // add parameters if they are  not default
          if (sort != "sort") {
            endpoint += `&sort=${sort}`;
          }
          if (ascending && sort != "sort") {
            endpoint += "&asc";
          }
          if (city != "city"){
            endpoint += `&city=${city}`;
          }
          if (!arrayEquals(i_tuition, [0, 1000000])) {
            endpoint += `&i_tuition=${i_tuition[0]}-${i_tuition[1]}`;
          }
          if (!arrayEquals(o_tuition, [0, 1000000])) {
            endpoint += `&o_tuition=${o_tuition[0]}-${o_tuition[1]}`;
          }
          if (!arrayEquals(admission, [0, 100])) {
            endpoint += `&a_rate=${admission[0] / 100}-${admission[1] / 100}`;
          }

          // get data and set size for pagination
          const data = await backendApi.get(endpoint);
          setColleges(data.data.data);
          setTotalColleges(data.data.meta.total);
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
    setLoad(false);
  }

  return (
    <>
      <Row className="mx-auto text-center w-50 mb-4">
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
      </Row>
      <Row className="mx-auto text-center w-50 mb-4">
        <Col>
          <FilterDropdown
            title="Sort by"
            items={[
              "Admission Rate",
              "Instate Tuition",
              "Outstate Tuition",
            ]}
            onChange={handleSortFilter}
          />
        </Col>
        <Col>
          <FilterDropdown
            title="Order by"
            items={[
              "Ascending",
              "Descending"
            ]}
            onChange={handleOrderFilter}
          />
        </Col>
        <Col>
          <Select
            placeholder="City"
            options={citiesFilterOptions.map(opt => ({ label: opt, value: opt }))}
            onChange={handleCityFilter}
          />
        </Col>
      </Row>
      <Row className="m-2">
        <Col>
          <Form.Label>In-state Tuition</Form.Label>
          <RangeSlider min={0} max={50000} onChange={handleItuitionFilter} />
        </Col>
        <Col>
          <Form.Label>Out of state Tuition</Form.Label>
          <RangeSlider min={0} max={100000} onChange={handleOtuitionFilter} />
        </Col>
        <Col>
          <Form.Label>Admission Rate</Form.Label>
          <RangeSlider min={0} max={100} onChange={handleAdmissionFilter} />
        </Col>
      </Row>
      
      <Row className="mx-auto text-center my-4">
        <Col>
          <Button
            variant="outline-secondary"
            onClick={() => setLoad(false)}
          >
            Submit
          </Button>
        </Col>
      </Row>


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
                      regex={regex}
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
