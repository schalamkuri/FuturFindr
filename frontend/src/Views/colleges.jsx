import React, {useState} from "react";
import CollegeCard from "../components/CollegeCard";
import CollegeList from "../Assets/Data/colleges.json"
import Container from "react-bootstrap/esm/Container";
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Colleges() {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // Get current posts
  var indexOfLastPost = currentPage * postsPerPage;
  var indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = CollegeList.slice(indexOfFirstPost, indexOfLastPost);
  var pages = []

  // Make page button for each page
  for (let number = 1; number <= Math.ceil(CollegeList.length / postsPerPage); number++) {
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

  // On click funtion for paginator
  function pagination(number) {
    indexOfLastPost = currentPage * postsPerPage;
    indexOfFirstPost = indexOfLastPost - postsPerPage;
    currentPosts = CollegeList.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPage(number);
  }

  return (
    <>
    <Container fluid>
      <Row>{
        currentPosts.map(data => {
          return (
            <Col sm={3} key={data.id}>
              <CollegeCard
                id={data.id}
                name={data.name}
                tuition={data.tuition}
                image_url={data.media}
                rank={data.rank}
                graduation_rate={data.graduation_rate}
                acceptance_rate={data.acceptance_rate}
                city={data.city}
              />
            </Col>
          );
        })
      }</Row>
      <Pagination style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",}}>
        {pages}
      </Pagination>
      <p class="font-weight-light text-right">
        Showing instances {indexOfFirstPost}-{indexOfLastPost} out of {CollegeList.length}
      </p>
    </Container>  
    </>
  );
}

export default Colleges;
