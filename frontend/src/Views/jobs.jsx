import React from "react";
import Container from "react-bootstrap/esm/Container";
import JobCard from "../components/JobCard";
import { JobsList } from "../Assets/Data/JobsData";

function Jobs(props) {

  // controls if the text for how many instances there are is shown
  function subText() {
    if (!props.reuse) {
      return (
        <div style={{marginRight: "20px"}}>
          <p class="font-weight-light text-right">{JobsList.length} out of {JobsList.length} instances</p>
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
      {JobsList.map((data) => {
          return (
              <JobCard
                  listing = {data.listing}
                  company = {data.company}
                  id = {data.id}
                  industry = {data.industry}
                  location = {data.location}
                  pay = {data.pay}
                  datePosted = {data.datePosted}
                  image_url = {data.image_url}
              />
          )
        })}
    </Container>
    {subText()}
    </div>
  );
}

export default Jobs;
