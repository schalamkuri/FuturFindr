import React from 'react'
import Card from 'react-bootstrap/Card'
import { Highlight } from 'react-highlight-regex';

function HousingCard(props) {

  // FUNCTION FROM GEO JOBS REPO AND SLIGHTLY EDITED
  // highlightes part of input that matches regex expression
	function highlightText(input) {
		if (props.regex != null && input != null) {
		  return <Highlight match={props.regex} text={input} />;
		}
		return input;
	}

  return (
    <Card className="card border-dark mb-3" style={{height: "90%"}}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{highlightText(props.address)}</Card.Title>
        <Card.Text>
            {highlightText(props.type)} <br></br>
            City: {props.city ? highlightText(props.city) : "~"} <br></br>
            Monthly Rent: ${props.price ? props.price : "~"} <br></br>
            Beds: {props.beds ? props.beds : "~"} <br></br>
            Baths {props.baths ? props.baths : "~"} <br></br>
            {props.sqft ? props.sqft : "~"} sqft<br></br>

        </Card.Text>
        <a href={`/housing/${props.id}`} className="stretched-link"></a>
      </Card.Body>
    </Card>
  )
}

export default HousingCard
