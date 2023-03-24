import React, { useState, useEffect } from "react";
import { backendApi } from "../Assets/Data/Constants";
import HousingCard from "../components/HousingCard";
// import Pagination from 'react-bootstrap/Pagination';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Spinner from 'react-bootstrap/Spinner';
import { Spinner, Pagination, Row, Col, Button, Form, Container, InputGroup } from "react-bootstrap";


function Housing() {

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [housingList, setHousing] = useState([])
  const [load, setLoad] = useState(false)
  const postsPerPage = 12;
  const totalHousing = 132;

  // Indexes
  var indexOfLastPost = currentPage * postsPerPage < totalHousing ?
    currentPage * postsPerPage : totalHousing;
  var indexOfFirstPost = indexOfLastPost - postsPerPage;

  const getHousing = async () => {
    try {
      var endpoint = 'housing?page='+ currentPage + '&per_page=' + postsPerPage
      const data = await backendApi.get(
        endpoint
      )
      setHousing(data.data.data)
      setLoad(true)
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    getHousing()
  },[housingList, load])


  // Create intermediate pages
  let numPages = Math.ceil(totalHousing / postsPerPage)
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
            className="mb-2"
            id="inlineFormInput"
            placeholder="Search Housing"
          />
        </Col>
        <Col xs="auto">
          <Button type="submit" className="mb-2" onClick={() => setLoad(false)}>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
    {load ? (
      <>
      <Row>{
        housingList.map(data => {
          return (
            <Col sm={3} key={data.id}>
              <HousingCard
                id = {data.id}
                address = {data.address}
                type = {data.property_type}
                city = {data.city}
                price = {data.price}
                beds = {data.bedrooms}
                baths = {data.bathrooms}
                dateListed = {data.date_listed}
                image = {data.id !== "12-E-46th-St,-New-York,-NY-10017" && data.id !== "125-Rivington-St,-Apt-2,-New-York,-NY-10002"? (
                  data.images.length !== 0 ? data.images[0].img_url 
                  : "https://www.pngkit.com/png/detail/413-4134663_house-vector-library-house-clipart-grey.png"
                ) : data.images[5].img_url}
                // {data.images.length != 0 ? data.images[0].img_url 
                //   : "https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg"}
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
        Showing instances {indexOfFirstPost}-{indexOfLastPost} out of {totalHousing}
      </p>
      </>
    ): (<Spinner animation="border" variant="info"/>)}
  </>
  );
}

export default Housing;
