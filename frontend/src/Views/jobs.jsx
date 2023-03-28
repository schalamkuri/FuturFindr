import React, { useState, useEffect, useRef } from "react";
import { backendApi } from "../Assets/Data/Constants";
import JobCard from "../components/JobCard";
import { Spinner, Pagination, Row, Col, Button, Form } from "react-bootstrap";
import RangeSlider from "../components/RangeSlider";
import Select from "react-select";
import { citiesFilterJobs } from "../Assets/Data/CitiesFilterJobs";
import { companiesFilterJobs } from "../Assets/Data/CompaniesFilterJobs.jsx";


// Searching and sorting implemenation references GeoJobs implemenation for
// overall general logic

function Jobs() {
  /* State */
  const [jobsList, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(1947);
  const [load, setLoad] = useState(false);
  const [regex, setRegex] = useState(null);

  /* API PARAMETERS */
  const searchQuery = useRef("");
  const postsPerPage = 12;

  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("sort");
  const [ascending, setAscending] = useState(true);
  const [city, setCity] = useState("city");
  const [company, setCompany] = useState("company");
  const [industry, setIndustry] = useState("industry");
  const [time, setTime] = useState("time");
  const [salary, setSalary] = useState([0, 250000]);

  // functions to handle state whenever filter ui is changed

  const handleSortFilter = (value) => {
    setSort(value.value.toLowerCase().replace(" ", "_"));
  };

  const handleOrderFilter = (value) => {
    setAscending(value.value === "Ascending");
  };

  const handleCityFilter = (value) => {
    setCity(value.value)
  }

  const handleCompanyFilter = (value) => {
    setCompany(value.value)
  }

  const handleIndustryFilter = (value) => {
    setIndustry(value.value)
  }

  const handleTimeFilter = (value) => {
    setTime(value.value)
  }

  const handleSalaryFilter = (value) => {
    setSalary(value);
  };

  function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  // makes the call to the backend to get data needed
  const getJobs = async () => {
    try {
      // will only make a call once new data is requested
      // this might be at the start, when you click a new page, or when
      // you submit a search/filter query
      if (!load) {
        // value of the api call
        var endpoint;

        // if searching
        if (searchQuery.current.value !== "") {
          // set endpoint to search this model with the query
          endpoint = `search/job/${searchQuery.current.value}?page=${currentPage}&per_page=${postsPerPage}`;
          // set regular expression for highlighting
          setRegex(
            new RegExp(searchQuery.current.value.replaceAll(" ", "|"), "i")
          );
        } else {
          // default to just paging
          endpoint = "jobs?page=" + currentPage + "&per_page=" + postsPerPage;
          // make sure there are no highlights from a previous search
          setRegex(null);

          // add parameters if they are  not default
          if (sort !== "sort") {
            endpoint += `&sort=${sort}`;
          }
          if (ascending && sort !== "sort") {
            endpoint += "&asc";
          }
          if (city !== "city"){
            endpoint += `&city=${city}`;
          }
          if (company !== "company"){
            endpoint += `&company=${company}`;
          }
          if (industry !== "industry"){
            endpoint += `&category=${industry}`;
          }
          if (time !== "time"){
            endpoint += `&type=${time}`;
          }
          if (!arrayEquals(salary, [0, 250000])) {
            endpoint += `&salary_range=${salary[0]}-${salary[1]}`;
          }
        }
        // get data and set size for pagination
        const data = await backendApi.get(endpoint);
        setJobs(data.data.data);
        setTotalJobs(data.data.meta.count);
        setLoad(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getJobs();
  }, [jobsList, load]);

  /* PAGINATION */

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
      <Row className="mx-auto text-center">
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            setLoad(false);
          }}
          className="d-flex justify-content-end"
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
      </Row>
      <Row className="mx-auto text-center w-50 mb-4">
        <Col className="heading">Jobs</Col>
      </Row>
      <Row className="mx-auto text-center">
        {/*w-50 mb-4*/}
        <Col>
          <Select
            placeholder="Sort by"
            options={[
              { label: "Salary Max", value: "Salary Max" },
              { label: "Salary Min", value: "Salary Max" },
            ]}
            onChange={handleSortFilter}
          />
        </Col>
        <Col>
          <Select
            placeholder="Order by"
            options={[
              { label: "Ascending", value: "Ascending" },
              { label: "Descending", value: "Descending" },
            ]}
            onChange={handleOrderFilter}
          />
        </Col>
        <Col>
          <Select
            placeholder="City"
            options={citiesFilterJobs.map(opt => ({ label: opt, value: opt }))}
            onChange={handleCityFilter}
          />
        </Col>
        <Col>
          <Select
            placeholder="Company"
            options={companiesFilterJobs.map((opt) => ({
              label: opt,
              value: opt,
            }))}
            onChange={handleCompanyFilter}
          />
        </Col>
        <Col>
          <Select
            placeholder="Industry"
            options={[
              { label: "Accounting & Finance Jobs", value: "Accounting & Finance Jobs" },
              { label: "Admin Jobs", value: "Admin Jobs" },
              { label: "Creative & Design Jobs", value: "Creative & Design Jobs" },
              { label: "Customer Services Jobs", value: "Customer Services Jobs" },
              { label: "Domestic help & Cleaning Jobs", value: "Domestic help & Cleaning Jobs" },
              { label: "Engineering Jobs", value: "Engineering Jobs" },
              { label: "Healthcare & Nursing Jobs", value: "Healthcare & Nursing Jobs" },
              { label: "Hospitality & Catering Jobs", value: "Hospitality & Catering Jobs" },
              { label: "HR & Recruitment Jobs", value: "HR & Recruitment Jobs" },
              { label: "IT Jobs", value: "IT Jobs" },
              { label: "Legal Jobs", value: "Legal Jobs" },
              { label: "Logistics & Warehouse Jobs", value: "Logistics & Warehouse Jobs" },
              { label: "Maintenance Jobs", value: "Maintenance Jobs" },
              { label: "Manufacturing Jobs", value: "Manufacturing Jobs" },
              { label: "Part time Jobs", value: "Part time Jobs" },
              { label: "PR, Advertising & Marketing Jobs", value: "PR, Advertising & Marketing Jobs" },
              { label: "Retail Jobs", value: "Retail Jobs" },
              { label: "Sales Jobs", value: "Sales Job" },
              { label: "Scientific & QA Jobs", value: "Scientific & QA Jobs" },
              { label: "Social work Jobs", value: "Social work Jobs" },
              { label: "Teaching Jobs", value: "Teaching Jobs" },
              { label: "Trade & Construction Jobs", value: "Trade & Construction Jobs" },
              { label: "Travel Jobs", value: "Travel Jobs" },
            ]}
            onChange={handleIndustryFilter}
          />
        </Col>
        <Col>
          <Select
            placeholder="Time"
            options={[
              { label: "Full-time", value: "Full-time" },
              { label: "Part-time", value: "Part-time" },
            ]}
            onChange={handleTimeFilter}
          />
        </Col>
      </Row>
      <Row className="m-2">
        <Form.Label className="text">Salary</Form.Label>
        <RangeSlider min={0} max={250000} onChange={handleSalaryFilter} />
      </Row>
      <Row className="mx-auto text-center my-4">
        <Col>
          <Button variant="outline-secondary" onClick={() => setLoad(false)}>
            Filter
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
            {jobsList.length !== 0 ? (
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
                      time={data.type}
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
            ) : (<p className="results span">No results found</p>)}
          </>
        ) : (
          <Spinner animation="border" variant="info" />
        )}
      </div>
    </>
  );
}

export default Jobs;
