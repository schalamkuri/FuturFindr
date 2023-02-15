import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function JobCard(props) {

  return (
    <Container>
        <Card className="card border-dark mb-3">
          <Card.Img variant="top" src={props.image_url} />
          <Card.Body>
            <Card.Title>{props.listing}</Card.Title>
            <Card.Text>
                {props.company} <br></br>
                Industry: {props.industry} <br></br>
                Location: {props.location} <br></br>
                Pay: {props.pay} <br></br>
                Date Posted: {props.datePosted} <br></br>
            </Card.Text>
            <a href=
              {`/jobs/${props.listing.split(' ').join('')+props.company.split(' ').join('')}`} 
              class="stretched-link"></a
            >
          </Card.Body>
        </Card>
    </Container>
  )
}

export default JobCard
