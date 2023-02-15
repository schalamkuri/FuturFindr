import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function JobCard(props) {
    
    let listing = props.listing
    let company = props.company
    let industry = props.industry
    let location = props.location
    let pay = props.pay
    let datePosted = props.datePosted
    let image_url = props.image_url

  return (
    <Container>
        <Card className="card border-dark mb-3">
          <Card.Img variant="top" src={image_url} />
          <Card.Body>
            <Card.Title>{listing}</Card.Title>
            <Card.Text>
                {company} <br></br>
                Industry: {industry} <br></br>
                Location: {location} <br></br>
                Pay: {pay} <br></br>
                Date Posted: {datePosted} <br></br>
            </Card.Text>
            <a href={`/jobs/${listing.split(' ').join('')+company}`} class="stretched-link"></a>
          </Card.Body>
        </Card>
    </Container>
  )
}

export default JobCard
