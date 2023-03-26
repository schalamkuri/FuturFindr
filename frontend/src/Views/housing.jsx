import React, { useState, useEffect, useRef } from "react";
import { backendApi } from "../Assets/Data/Constants";
import HousingCard from "../components/HousingCard";
import {
  Spinner,
  Pagination,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";

function Housing() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [housingList, setHousing] = useState([]);
  const [load, setLoad] = useState(false);
  const [regex, setRegex] = useState(null);
  const [totalHousing, setTotalHousing] = useState(132);

  const postsPerPage = 12;
  const searchQuery = useRef("");

  // determine index of the last post
  var indexOfLastPost =
    currentPage * postsPerPage < totalHousing
      ? currentPage * postsPerPage
      : totalHousing;

  // determine index of the first post
  var indexOfFirstPost;
  if (indexOfLastPost - postsPerPage < 1) {
    indexOfFirstPost = totalHousing;
  } else if (currentPage * postsPerPage > totalHousing) {
    indexOfFirstPost = totalHousing - (totalHousing % postsPerPage);
  } else {
    indexOfFirstPost = indexOfLastPost - postsPerPage;
  }

  const getHousing = async () => {
    try {
      if (!load) {
        var endpoint;
        if (searchQuery.current.value != "") {
          endpoint = `search/housing/${searchQuery.current.value}?page=${currentPage}&per_page=${postsPerPage}`;
          setRegex(
            new RegExp(searchQuery.current.value.replaceAll(" ", "|"), "i")
          );
          const data = await backendApi.get(endpoint);
          setHousing(data.data.data);
          setTotalHousing(data.data.meta.total);
        } else {
          endpoint = "housing?page=" + currentPage + "&per_page=" + postsPerPage;
          setRegex(null);
          const data = await backendApi.get(endpoint);
          setHousing(data.data.data);
          setTotalHousing(132);
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
      <div
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      ></div>
      {load ? (
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
                    regex={regex}
                    image={
                      data.id !== "12-E-46th-St,-New-York,-NY-10017" &&
                      data.id !== "125-Rivington-St,-Apt-2,-New-York,-NY-10002"
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
        <Spinner animation="border" variant="info" />
      )}
    </>
  );
}

export default Housing;
