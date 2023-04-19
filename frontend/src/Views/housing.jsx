import React, { useState, useEffect, useRef } from "react";
import { backendApi } from "../Assets/Data/Constants";
import HousingCard from "../components/HousingCard";
import { Spinner, Pagination, Row, Col, Button, Form } from "react-bootstrap";
import RangeSlider from "../components/RangeSlider";
import Select from "react-select";

// Searching and sorting implemenation references GeoJobs implemenation for
// overall general logic

function Housing() {
  /* State */
  const [housingList, setHousing] = useState([]);
  const [totalHousing, setTotalHousing] = useState(132);
  const [load, setLoad] = useState(false);
  const [regex, setRegex] = useState(null);

  /* API PARAMETERS */
  const searchQuery = useRef("");
  const postsPerPage = 12;

  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("sort");
  const [ascending, setAscending] = useState(true);
  const [city, setCity] = useState("city");
  const [type, setType] = useState("type");
  const [rent, setRent] = useState([0, 12000]);
  const [bedrooms, setBedrooms] = useState([0, 5]);
  const [bathrooms, setBathrooms] = useState([0, 6]);

  // functions to handle state whenever filter ui is changed

  const handleSortFilter = (value) => {
    setSort(value.value.toLowerCase().replace(" ", "_"));
  };

  const handleOrderFilter = (value) => {
    setAscending(value.value === "Ascending");
  };

  const handleCityFilter = (value) => {
    setCity(value.value);
  };

  const handletypeFilter = (value) => {
    setType(value.value);
  };

  const handleRentFilter = (value) => {
    setRent(value);
  };

  const handleBedroomsFilter = (value) => {
    setBedrooms(value);
  };

  const handleBathroomsFilter = (value) => {
    setBathrooms(value);
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
  const getHousing = async () => {
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
          endpoint = `search/housing/${searchQuery.current.value}?page=${currentPage}&per_page=${postsPerPage}`;
          // set regular expression for highlighting
          setRegex(
            new RegExp(searchQuery.current.value.replaceAll(" ", "|"), "i")
          );
        } else {
          // default to just paging
          endpoint =
            "housing?page=" + currentPage + "&per_page=" + postsPerPage;
          // make sure there are no highlights from a previous search
          setRegex(null);

          // add parameters if they are  not default
          if (sort !== "sort") {
            endpoint += `&sort=${sort}`;
          }
          if (ascending && sort !== "sort") {
            endpoint += "&asc";
          }
          if (city !== "city") {
            endpoint += `&city=${city}`;
          }
          if (type !== "type") {
            endpoint += `&p_type=${type}`;
          }
          if (!arrayEquals(rent, [0, 12000])) {
            endpoint += `&price=${rent[0]}-${rent[1]}`;
          }
          if (!arrayEquals(bedrooms, [0, 5])) {
            endpoint += `&bedrooms=${bedrooms[0]}-${bedrooms[1]}`;
          }
          if (!arrayEquals(bathrooms, [0, 6])) {
            endpoint += `&bathrooms=${bathrooms[0]}-${bathrooms[1]}`;
          }
        }
        // get data and set size for pagination
        const data = await backendApi.get(endpoint);
        setHousing(data.data.data);
        if (searchQuery.current.value !== "") {
          setTotalHousing(data.data.meta.total);
        } else {
          setTotalHousing(data.data.meta.count);
        }
        setLoad(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getHousing();
  }, [housingList, load]);

  /* PAGINATION */

  // determine index of the last post
  var indexOfLastPost =
    currentPage * postsPerPage < totalHousing
      ? currentPage * postsPerPage
      : totalHousing;

  // determine index of the first post
  var indexOfFirstPost;
  if (indexOfLastPost - postsPerPage < 0) {
    indexOfFirstPost = totalHousing;
  } else if (currentPage * postsPerPage > totalHousing) {
    indexOfFirstPost = totalHousing - (totalHousing % postsPerPage);
  } else {
    indexOfFirstPost = indexOfLastPost - postsPerPage;
  }

  // Create intermediate pages
  let numPages = Math.ceil(totalHousing / postsPerPage);
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
            placeholder="Search Housing"
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
        <Col className="heading">Housing</Col>
      </Row>
      <Row className="mx-auto text-center w-50 mb-4">
        <Col>
          <Select
            placeholder="Sort by"
            options={[
              { label: "Monthly Rent", value: "Price" },
              { label: "Squarefeet", value: "sqft" },
              { label: "Bedrooms", value: "Bedrooms" },
              { label: "Bathrooms", value: "Bathrooms" },
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
            options={[
              { label: "Albuquerque", value: "Albuquerque" },
              { label: "Arlington", value: "Arlington" },
              { label: "Atlanta", value: "Atlanta" },
              { label: "Bakersfield", value: "Bakersfield" },
              { label: "Baltimore", value: "Baltimore" },
              { label: "Chicago", value: "Chicago" },
              { label: "Colorado Springs", value: "Colorado Springs" },
              { label: "Detroit", value: "Detroit" },
              { label: "El Paso", value: "El Paso" },
              { label: "Fresno", value: "Fresno" },
              { label: "Indianapolis", value: "Indianapolis" },
              { label: "Kansas City", value: "Kansas City" },
              { label: "Las Vegas", value: "Las Vegas" },
              { label: "Los Angeles", value: "Los Angeles" },
              { label: "Mesa", value: "Mesa" },
              { label: "Miami", value: "Miami" },
              { label: "Milwaukee", value: "Milwaukee" },
              { label: "New York", value: "New York" },
              { label: "Oklahoma City", value: "Oklahoma City" },
              { label: "Sacramento", value: "Sacramento" },
              { label: "San Antonio", value: "San Antonio" },
              { label: "Tulsa", value: "Tulsa" },
              { label: "Virginia Beach", value: "Virginia Beach" },
              { label: "Wichita", value: "Wichita" },
            ]}
            onChange={handleCityFilter}
          />
        </Col>
        <Col>
          <Select
            placeholder="Property Type"
            options={[
              { label: "Apartment", value: "Apartment" },
              { label: "Single Family", value: "Single Family" },
              { label: "Townhouse", value: "Townhouse" },
              { label: "Condo", value: "Condo" },
              { label: "Duplex-Triplex", value: "Duplex-Triplex" },
            ]}
            onChange={handletypeFilter}
          />
        </Col>
      </Row>
      <Row className="m-2">
        <Col>
          <Form.Label className="text">Monthly Rent</Form.Label>
          <RangeSlider min={0} max={12000} onChange={handleRentFilter} />
        </Col>
        <Col>
          <Form.Label className="text">Bedrooms</Form.Label>
          <RangeSlider min={0} max={5} onChange={handleBedroomsFilter} />
        </Col>
        <Col>
          <Form.Label className="text">Bathrooms</Form.Label>
          <RangeSlider min={0} max={6} onChange={handleBathroomsFilter} />
        </Col>
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
      ></div>
      {load ? (
        <>
          {housingList.length !== 0 ? (
            <>
              <Row>
                {housingList.map((data) => {
                  return (
                    <Col sm={3} key={data.id}>
                      <HousingCard
                        id={data.id}
                        address={data.address}
                        type={data.property_type}
                        city={data.city}
                        price={data.price}
                        beds={data.bedrooms}
                        baths={data.bathrooms}
                        dateListed={data.date_listed}
                        sqft={data.sqft}
                        regex={regex}
                        image={
                          data.id !== "12-E-46th-St,-New-York,-NY-10017" &&
                          data.id !==
                            "125-Rivington-St,-Apt-2,-New-York,-NY-10002"
                            ? data.images.length !== 0
                              ? data.images[0].img_url
                              : "https://www.pngkit.com/png/detail/413-4134663_house-vector-library-house-clipart-grey.png"
                            : data.images[5].img_url
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
                {totalHousing}
              </p>
            </>
          ) : (
            <p className="results span">No results found</p>
          )}
        </>
      ) : (
        <Spinner animation="border" variant="info" />
      )}
    </>
  );
}

export default Housing;
