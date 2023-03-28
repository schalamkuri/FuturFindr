import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { backendApi } from "../Assets/Data/Constants";
import CollegeCard from "../components/CollegeCard";
import JobCard from "../components/JobCard";
import HousingCard from "../components/HousingCard";

// Code is adapted from geojobs's implemenation with some changes
// https://gitlab.com/sarthaksirotiya/cs373-idb/-/blob/main/front-end/src/views/Search.jsx

const Search = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  const userQuery = useParams()["query"];
  const regex = new RegExp(`(?:${userQuery.replaceAll("%20", "|")})`, "i");

  // load data from query
  // this will get results for all 3 models
  const getData = async () => {
    try {
      var endpoint = "/search/" + userQuery;
      const result = await backendApi.get(endpoint);
      setData(result.data);
      setLoad(true);
    } catch (e) {
      console.log(e);
    }
  };

  // this will run exactly once
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <h1>Search Results</h1>
      <Tabs defaultActiveKey="Colleges">
        <Tab eventKey="Colleges" title="Colleges">
          {load ? (
            <>
            {data["colleges"].length !== 0 ? (
            <Row>
              {data["colleges"].map((data) => {
                return (
                  <Col sm={4} key={data.id}>
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
            ) : (<p className="results span">No results found</p>)}
            </>
          ) : (
            <Spinner animation="border" variant="info" />
          )}
        </Tab>
        <Tab eventKey="Jobs" title="Jobs">
          {load ? (
            <>
            {data["jobs"].length !== 0 ? (
            <Row>
              {data["jobs"].map((data) => {
                return (
                  <Col sm={4} key={data.id}>
                    <JobCard
                      id={data.id}
                      title={data.title}
                      company={data.company}
                      category={data.category}
                      location={data.city}
                      salaryMin={data.salary_min}
                      salaryMax={data.salary_max}
                      datePosted={data.created}
                      image={
                        data.img_url
                          ? data.img_url
                          : "https://thumbs.dreamstime.com/b/cv-writing-job-application-resume-gray-icon-vector-graphics-various-use-187075464.jpg"
                      }
                      regex={regex}
                    />
                  </Col>
                );
              })}
            </Row>
            ) : (<p className="results span">No results found</p>)}
            </>
          ) : (
            <Spinner animation="border" variant="info" />
          )}
        </Tab>
        <Tab eventKey="Housing" title="Housing">
          {load ? (
            <>
            {data["housing"].length !== 0 ? (
            <Row>
              {data["housing"].map((data) => {
                return (
                  <Col sm={4} key={data.id}>
                    <HousingCard
                      id={data.id}
                      address={data.address}
                      type={data.property_type}
                      city={data.city}
                      price={data.price}
                      beds={data.bedrooms}
                      baths={data.bathrooms}
                      dateListed={data.date_listed}
                      image={
                        data.id !== "12-E-46th-St,-New-York,-NY-10017" &&
                        data.id !==
                          "125-Rivington-St,-Apt-2,-New-York,-NY-10002"
                          ? data.images.length !== 0
                            ? data.images[0].img_url
                            : "https://www.pngkit.com/png/detail/413-4134663_house-vector-library-house-clipart-grey.png"
                          : data.images[5].img_url
                      }
                      regex={regex}
                    />
                  </Col>
                );
              })}
            </Row>
            ) : (<p className="results span">No results found</p>)}
            </>
          ) : (
            <Spinner animation="border" variant="info" />
          )}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Search;
