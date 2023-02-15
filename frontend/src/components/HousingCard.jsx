import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function HousingCard(props) {
  return (
    <Container>
        <Card className="card border-dark mb-3">
          <Card.Img variant="top" src={props.image_url} />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                {props.type} <br></br>
                City: {props.city} <br></br>
                Monthly Rent: {props.price} <br></br>
                Beds: {props.beds} <br></br>
                Baths {props.baths} <br></br>
            </Card.Text>
            <a href={`/housing/${props.name.split(' ').join('')}`} class="stretched-link"></a>
          </Card.Body>
        </Card>
    </Container>
  )
}

export default HousingCard
