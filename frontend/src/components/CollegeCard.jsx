import React from 'react'
import Card from 'react-bootstrap/Card';

function CollegeCard(props) {
	return (
		<Card className="card border-dark mb-3" style={{height: "90%"}}>
			<Card.Img variant="top" src={props.img_url ? props.img_url : "https://www.convergemedia.org/wp-content/uploads/2017/01/academia-1000.png"}/>
			<Card.Body>
				<Card.Title>{props.name}</Card.Title>
				<Card.Text>
					Instate Tuition: ${props.instateTuition ? props.instateTuition : "~"} <br></br>
					Outstate Tuition: ${props.outstateTuition ? props.outstateTuition : "~"} <br></br>
					Admission Rate: %{props.admissionRate ? Math.trunc(props.admissionRate * 100) : "~"} <br></br>
					City: {props.city} <br></br>
				</Card.Text>
				<a href={`/colleges/${props.id}`} class="stretched-link"></a>
			</Card.Body>
		</Card>
	);
}

export default CollegeCard;