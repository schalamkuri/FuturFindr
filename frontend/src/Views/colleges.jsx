import React, { useState, useEffect } from "react";
import {backendApi} from "../Assets/Data/Constants"
import CollegeCard from "../components/CollegeCard";
import Container from "react-bootstrap/esm/Container";
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';


function Colleges() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [collegeList, setColleges] = useState([]);
  const [load, setLoad] = useState(false);
  const postsPerPage = 8;
  const totalColleges = 4000;

  // Indexes
  var indexOfLastPost = currentPage * postsPerPage < totalColleges ?
    currentPage * postsPerPage : totalColleges;
  var indexOfFirstPost = indexOfLastPost - postsPerPage;

  const getColleges = async () => {
    try {
      var endpoint = 'colleges?page='+ currentPage + '&per_page=8'
      const data = await backendApi.get(
        endpoint
      )
      setColleges(data.data.data)
      setLoad(true)
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    getColleges()
  }, [collegeList, load])


  // Create intermediate pages
  let numPages = Math.ceil(totalColleges / postsPerPage)
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
    <div style={{
      display: "block",
      marginLeft: "auto",
      marginRight: "auto"  }}>
      {load ? (
        <>
        <Row>{
          collegeList.map(data => {
            return (
              <Col sm={3} key={data.id}>
                <CollegeCard
                id={data.id}
                name={data.name}
                instateTuition={data.instate_tuition}
                outstateTuition={data.outstate_tuition}
                image_url={data.img_url}
                admissionRate={data.admission_rate}
                city={data.city}
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
          Showing instances {indexOfFirstPost}-{indexOfLastPost} out of {totalColleges}
        </p>
        </>
      ): (<Spinner animation="border" variant="info"/>)}
  </div>
  </>
  );
}

export default Colleges;
