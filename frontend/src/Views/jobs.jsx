import React from "react";
import Container from "react-bootstrap/esm/Container";
import JobCard from "../components/JobCard";
import { JobsList } from "../Assets/Data/JobsData";

function Jobs() {
  return (
    <div>
    <Container style={{display: 'flex'}}>
      {JobsList.map((data) => {
          return (
              <JobCard
                  listing = {data.listing}
                  company = {data.company}
                  industry = {data.industry}
                  location = {data.location}
                  pay = {data.pay}
                  datePosted = {data.datePosted}
                  image_url = {data.image_url}
              />
          )
        })}
    </Container>
    </div>
  );
}

export default Jobs;
