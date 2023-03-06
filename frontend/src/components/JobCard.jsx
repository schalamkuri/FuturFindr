import React from 'react'
import Card from 'react-bootstrap/Card';

function JobCard(props) {
  return (
    <Card className="card border-dark mb-3" style={{height: "90%" }}>
      <Card.Img variant="top" src={"https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg"}/>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
            {props.company} <br></br>
            Industry: {props.category} <br></br>
            Location: {props.location} <br></br>
            Pay range: ${props.salaryMin}-{props.salaryMax} <br></br>
            Date Posted: {props.datePosted.split("T")[0]} <br></br>
        </Card.Text>
        <a href=
          {`/jobs/${props.id}`} 
          class="stretched-link"></a
        >
      </Card.Body>
    </Card>
  )
}

export default JobCard
