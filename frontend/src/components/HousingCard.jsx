import React from 'react'
import Card from 'react-bootstrap/Card';

function HousingCard(props) {
  return (
    <Card className="card border-dark mb-3" style={{height: "90%"}}>
      <Card.Img variant="top" src={props.images} />
      <Card.Body>
        <Card.Title>{props.address}</Card.Title>
        <Card.Text>
            {props.type} <br></br>
            City: {props.city} <br></br>
            Monthly Rent: {props.price} <br></br>
            Beds: {props.beds} <br></br>
            Baths {props.baths} <br></br>
        </Card.Text>
        <a href={`/housing/${props.id}`} className="stretched-link"></a>
      </Card.Body>
    </Card>
  )
}

export default HousingCard
