import React, { useState, useEffect } from "react";
import { backendApi } from "../Assets/Data/Constants";
import HousingCard from "../components/HousingCard";
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

function Housing() {

  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [housingList, setHousing] = useState([])
  const [load, setLoad] = useState(false)
  const postsPerPage = 8;
  const totalHousing = 132;

  // Indexes
  var indexOfLastPost = currentPage * postsPerPage < totalHousing ?
    currentPage * postsPerPage : totalHousing;
  var indexOfFirstPost = indexOfLastPost - postsPerPage;

  const getHousing = async () => {
    try {
      var endpoint = 'housing?page='+ currentPage + '&per_page=8'
      const data = await backendApi.get(
        endpoint
      )
      console.log(data)
      setHousing(data.data.data)
      setLoad(true)
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    getHousing()
  }, [housingList, load])


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
                images = {data.id != "12-E-46th-St,-New-York,-NY-10017" && data.id != "125-Rivington-St,-Apt-2,-New-York,-NY-10002"? (
                  data.images.length != 0 ? data.images[0].img_url 
                  : "https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg"
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
