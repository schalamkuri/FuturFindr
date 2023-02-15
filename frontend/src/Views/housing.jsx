import React from "react";
import Container from "react-bootstrap/esm/Container";
import HousingCard from "../components/HousingCard";
import { Housing_List } from "../Assets/Data/HousingData";

function Housing() {
  return (
    <div>
    <Container style={{display: 'flex'}}>
      {Housing_List.map((data) => {
          return (
              <HousingCard
                  name = {data.name}
                  city = {data.city}
                  beds = {data.beds}
                  baths = {data.baths}
                  price = {data.rent}
                  type = {data.type}
                  image_url = {data.image_url}
              />
          )
        })}
    </Container>
    </div>
  )
}

export default Housing;
