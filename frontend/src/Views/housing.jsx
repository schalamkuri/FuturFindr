import React from "react";
import Container from "react-bootstrap/esm/Container";
import HousingCard from "../components/HousingCard";
import { HousingList } from "../Assets/Data/HousingData";

function Housing(props) {

  // controls if the text for how many instances there are is shown
  function subText() {
    if (!props.reuse) {
      return (
        <div style={{marginRight: "20px"}}>
          <p class="font-weight-light text-right">{HousingList.length} out of {HousingList.length} instances</p>
          <p class="font-weight-light text-right">Page 1</p>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div>
    <Container style={{display: 'flex'}}>
      {HousingList.map((data) => {
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
    {subText()}
    </div>
  )
}

export default Housing;
