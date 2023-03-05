import React from 'react'
import Card from 'react-bootstrap/Card';

function CollegeCard(props) {
	return (
		<Card className="card border-dark mb-3" style={{height: "90%"}}>
			<Card.Img variant="top" src={props.image_url}/>
			<Card.Body>
				<Card.Title>{props.name}</Card.Title>
				<Card.Text>
					Tuition: {props.tuition} <br></br>
					Rank: {props.rank} <br></br>
					Graduation Rate: {props.graduation_rate} <br></br>
					Acceptance Rate: {props.acceptance_rate} <br></br>
					City: {props.city} <br></br>
				</Card.Text>
				<a href=
				{`/colleges/${props.name.split(' ').join('')}`} 
				class="stretched-link"></a
				>
			</Card.Body>
		</Card>
	);
}

export default CollegeCard;