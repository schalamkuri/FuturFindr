import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { backendApi } from "../Assets/Data/Constants";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import "./connections.css";

function JobsInstance() {
  // state
  const id = useParams()["id"];
  const [job, setJob] = useState([]);
  const [load, setLoad] = useState(false);
  const temp = "hafsadf";

  // get specific job instance from backend
  const getJob = async () => {
    try {
      var endpoint = "jobs/" + id;
      const data = await backendApi.get(endpoint);
      setJob(data.data.data);
      setLoad(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getJob();
  });

  return (
    <div>
      {load ? (
        <Container>
          <Card className="card border-dark mb-3" style={{ height: "90%" }}>
            <Card.Img
              variant="top"
              src={
                job.img_url
                  ? job.img_url
                  : "https://thumbs.dreamstime.com/b/cv-writing-job-application-resume-gray-icon-vector-graphics-various-use-187075464.jpg"
              }
            />
            <Card.Body>
              <Card.Title>{job.title}</Card.Title>
              <Card.Text>
                Company: {job.company} <br></br>
                Industry: {job.category} <br></br>
                Location: {job.city} <br></br>
                Pay range: ${job.salary_min}-{job.salary_max} <br></br>
                Date Posted: {job.created} <br></br>
              </Card.Text>
            </Card.Body>
            <Card.Footer>{job.description}</Card.Footer>
            <iframe
              width="600"
              height="450"
              style={{ border: "0" }}
              loading="lazy"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${job.latitude} ${job.longitude}`}
            ></iframe>
            <Button variant="info" href={job.url}>
              See job listing
            </Button>
          </Card>
          <Container></Container>

          {job.nearby_housing_units.length !== 0 ? (
            <>
              <div className="title-holder">
                <h2>Housing</h2>
                <div className="subtitle">Checkout nearby housing</div>
              </div>
              <Row className="portfoliolist">
                {job.nearby_housing_units.map((housing) => {
                  return (
                    <Col sm={4} key={housing.id}>
                      <div className="portfolio-wrapper">
                        <a href={`/housing/${housing.id}`}>
                          <Image
                            src={
                              housing.img_url
                                ? housing.img_url
                                : "https://www.pngkit.com/png/detail/413-4134663_house-vector-library-house-clipart-grey.png"
                            }
                          />
                          <div className="label text-center">
                            <h3>{housing.address}</h3>
                            <p>{housing.property_type}</p>
                          </div>
                        </a>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </>
          ) : null}
          {job.nearby_colleges.length !== 0 ? (
            <>
              <div className="title-holder">
                <h2>Colleges</h2>
                <div className="subtitle">Checkout nearby colleges</div>
              </div>
              <Row className="portfoliolist">
                {job.nearby_colleges.map((college) => {
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
                              Admission Rate: %
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

export default JobsInstance;
