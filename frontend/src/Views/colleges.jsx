import React, { useState, useEffect, useRef } from "react";
import { backendApi } from "../Assets/Data/Constants";
import CollegeCard from "../components/CollegeCard";
import RangeSlider from "../components/RangeSlider";
import {
  Spinner,
  Pagination,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";

function Colleges() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [collegeList, setColleges] = useState([]);
  const [load, setLoad] = useState(false);
  const [regex, setRegex] = useState(null);
  const [totalColleges, setTotalColleges] = useState(4000);

  const [i_tuition, setItuition] = useState([0, 1000000]);
  const [o_tuition, setOtuition] = useState([0, 1000000]);

  const postsPerPage = 12;
  const searchQuery = useRef("");

  // determine index of the last post
  var indexOfLastPost =
    currentPage * postsPerPage < totalColleges
      ? currentPage * postsPerPage
      : totalColleges;

  // determine index of the first post
  var indexOfFirstPost;
  if (indexOfLastPost - postsPerPage < 1) {
    indexOfFirstPost = totalColleges;
  } else if (currentPage * postsPerPage > totalColleges) {
    indexOfFirstPost = totalColleges - (totalColleges % postsPerPage);
  } else {
    indexOfFirstPost = indexOfLastPost - postsPerPage;
  }



  const handleItuitionFilter = (value) => {
    setItuition(value);
  };

  const handleOtuitionFilter = (value) => {
    setOtuition(value);
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
        var endpoint;
        if (searchQuery.current.value != "") {
          endpoint = `search/college/${searchQuery.current.value}?page=${currentPage}&per_page=${postsPerPage}`;
          setRegex(
            new RegExp(searchQuery.current.value.replaceAll(" ", "|"), "i")
          );
          const data = await backendApi.get(endpoint);
          setColleges(data.data.data);
          setTotalColleges(data.data.meta.total);
        } else {
          endpoint =
            "colleges?page=" + currentPage + "&per_page=" + postsPerPage;
          setRegex(null);
          if (!arrayEquals(i_tuition, [0, 1000000])) {
            endpoint += `&i_tuition=${i_tuition[0]}-${i_tuition[1]}`;
          }
          if (!arrayEquals(o_tuition, [0, 1000000])) {
            endpoint += `&o_tuition=${o_tuition[0]}-${o_tuition[1]}`;
          }
          const data = await backendApi.get(endpoint);
          setColleges(data.data.data);
          setTotalColleges(4000);
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

      <Form className="filter-form">
        {/* <Row className="mx-auto text-center w-50 mb-4">
          <Col>
            <FilterDropdown
              title="Sort"
              items={[
                "Sort",
                "Salary Min",
                "Company",
                "Title",
                "Category",
                "Created",
              ]}
              onChange={handleSortFilter}
            />
          </Col>
          <Col>
            <FilterDropdown
              title="Order"
              items={["Ascending", "Descending"]}
              onChange={handleOrderFilter}
            />
          </Col>
          <Col>
            <FilterDropdown
              title="City"
              items={[
                "City",
                "New York, NY",
                "Los Angeles, CA",
                "Chicago, IL",
                "Houston, TX",
                "Phoenix, AZ",
                "Philadelphia, PA",
                "San Antonio, TX",
                "San Diego, CA",
                "Dallas, TX",
                "San Jose, CA",
                "Austin, TX",
                "Jacksonville, FL",
                "Fort Worth, TX",
                "Columbus, OH",
                "Indianapolis, IN",
                "Charlotte, NC",
                "San Francisco, CA",
                "Seattle, WA",
                "Denver, CO",
                "Washington D.C.",
                "Nashville, TN",
                "Oklahoma City, OK",
                "El Paso, TX",
                "Boston, MA",
                "Portland, OR",
                "Las Vegas, NV",
                "Detroit, MI",
                "Memphis, TN",
                "Louisville, KY",
                "Baltimore, MD",
                "Milwaukee, WI",
                "Albuquerque, NM",
                "Tucson, AZ",
                "Fresno, CA",
                "Sacramento, CA",
                "Kansas City, MO",
                "Mesa, AZ",
                "Atlanta, GA",
                "Omaha, NE",
                "Colorado Springs, CO",
                "Raleigh, NC",
                "Long Beach, CA",
                "Virginia Beach, VA",
                "Miami, FL",
                "Oakland, CA",
                "Minneapolis, MN",
                "Tulsa, OK",
                "Bakersfield, CA",
                "Wichita, KS",
                "Arlington, TX",
              ]}
              scroll
              onChange={handleCityFilter}
            />
          </Col>
          <Col>
            <FilterDropdown
              title="Job Category"
              items={[
                "Accounting & Finance Jobs",
                "Admin Jobs",
                "Consultancy Jobs",
                "Creative & Design Jobs",
                "Customer Services Jobs",
                "Domestic help & Cleaning Jobs",
                "Energy, Oil & Gas Jobs",
                "Engineering Jobs",
                "HR & Recruitment Jobs",
                "Healthcare & Nursing Jobs",
                "Hospitality & Catering Jobs",
                "IT Jobs",
                "Legal Jobs",
                "Logistics & Warehouse Jobs",
                "Maintenance Jobs",
                "Manufacturing Jobs",
                "Other/General Jobs",
                "PR, Advertising & Marketing Jobs",
                "Property Jobs",
                "Retail Jobs",
                "Sales Jobs",
                "Scientific & QA Jobs",
                "Social work Jobs",
                "Teaching Jobs",
                "Trade & Construction Jobs",
                "Travel Jobs",
              ]}
              scroll
              onChange={HandleCategoryFilter}
            />
          </Col>
        </Row> */}
        <Row className="m-2">
          <Col>
            <Form.Label>In-state Tuition</Form.Label>
            <RangeSlider min={0} max={50000} onChange={handleItuitionFilter} />
          </Col>
          <Col>
            <Form.Label>Out of state Tuition</Form.Label>
            <RangeSlider min={0} max={100000} onChange={handleOtuitionFilter} />
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
