import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function HousingCard(props) {
  
    let name = props.name
    let type = props.type
    let city = props.city
    let beds = props.beds
    let baths = props.baths
    let price = props.price
    let image_url = props.image_url

  return (
    <Container>
        <Card className="card border-dark mb-3">
          <Card.Img variant="top" src={image_url} />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
                {type} <br></br>
                City: {city} <br></br>
                Monthly Rent: {price} <br></br>
                Beds: {beds} <br></br>
                Baths {baths} <br></br>
            </Card.Text>
            <a href={`/housing/${name.split(' ').join('')}`} class="stretched-link"></a>
          </Card.Body>
        </Card>
    </Container>
  )
}

export default HousingCard
