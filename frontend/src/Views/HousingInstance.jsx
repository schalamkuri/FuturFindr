import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { backendApi } from "../Assets/Data/Constants";
import "./connections.css";
import {Card, Container, Row, Col, Image, Carousel, Spinner } from "react-bootstrap";

function HousingInstance() {
  // state
  const id = useParams()["id"];
  const [house, setHouse] = useState([]);
  const [load, setLoad] = useState(false);
  const [items, setItems] = useState([]);
  const [addy, setAddy] = useState([]);
  

  // get specific housing instance from backend
  const getHouse = async () => {
    try {
      var endpoint = "housing/" + id;
      const data = await backendApi.get(endpoint);
      setHouse(data.data.data);
      setAddy(house.id.replace(/-/g, '+'));
      setLoad(true);
      // Create carousel items for each image
      var items = [];
      for (var i = 0; i < house.images.length; i++) {
        items.push(
          <Carousel.Item>
            <img
              className="d-block w-100 img-carousel"
              src={house.images[i].img_url}
            />
          </Carousel.Item>
        );
      }
      setItems(items);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getHouse();
  });

  return (
    <div>
      {load ? (
        <Container>
          <Card className="card border-dark mb-3" style={{ height: "90%" }}>
            <Card.Img variant="top" src={house.images.img_url} />
            {house.images.length === 0 ? (
              <Card.Img
                variant="top"
                src={
                  "https://www.pngkit.com/png/detail/413-4134663_house-vector-library-house-clipart-grey.png"
                }
              />
            ) : (
              <Carousel slide={false}>{items}</Carousel>
            )}
            <Card.Body>
              <Card.Title>{house.address}</Card.Title>
              <Card.Text>
                {house.property_type} <br></br>
                City: {house.city} <br></br>
                Monthly Rent: ${house.price} <br></br>
                Beds: {house.bedrooms ? house.bedrooms : "~"} <br></br>
                Baths {house.bathrooms ? house.bedrooms : "~"} <br></br>
              </Card.Text>
            </Card.Body>
            <iframe
              width="600"
              height="450"
              style={{ border: "0" }}
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${addy}`}
            ></iframe>
          </Card>
          {house.nearby_jobs.length !== 0 ? (
            <>
              <div className="title-holder">
                <h2>Jobs</h2>
                <div className="subtitle">Checkout nearby jobs</div>
              </div>
              <Row className="portfoliolist">
                {house.nearby_jobs.map((job) => {
                  return (
                    <Col sm={4} key={job.id}>
                      <div className="portfolio-wrapper">
                        <a href={`/jobs/${job.id}`}>
                          <Image
                            src={
                              job.img_url
                                ? job.img_url
                                : "https://thumbs.dreamstime.com/b/cv-writing-job-application-resume-gray-icon-vector-graphics-various-use-187075464.jpg"
                            }
                          />
                          <div className="label text-center">
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                          </div>
                        </a>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </>
          ) : null}
          {house.nearby_colleges.length !== 0 ? (
            <>
              <div className="title-holder">
                <h2>Colleges</h2>
                <div className="subtitle">Checkout nearby colleges</div>
              </div>
              <Row className="portfoliolist">
                {house.nearby_colleges.map((college) => {
                  return (
                    <Col sm={4} key={college.id}>
                      <div className="portfolio-wrapper">
                        <a href={`/colleges/${college.id}`}>
                          <Image
                            src={
                              college.img_url
                                ? college.img_url
                                : "https://www.convergemedia.org/wp-content/uploads/2017/01/academia-1000.png"
                            }
                          />
                          <div className="label text-center">
                            <h3>{college.name}</h3>
                            <p>
                              Admission Rate:{" "}
                              {college.admission_rate
                                ? Math.trunc(college.admission_rate * 100)
                                : "~"}
                            </p>
                          </div>
                        </a>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </>
          ) : null}
        </Container>
      ) : (
        <Spinner animation="border" variant="info" />
      )}
    </div>
  );
}

export default HousingInstance;
