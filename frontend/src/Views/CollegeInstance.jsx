import React from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router';
import { CollegesMap } from "../Assets/Data/CollegesMap";
import  CollegeData from "../Assets/Data/colleges.json";
import Jobs from "./jobs";
import Housing from "./housing";

function CollegeInstance() {
    const params = useParams()
    let id = params['id']
    let props = CollegeData[CollegesMap[id]]

    return (
        <div>
        <Container>
            <Card className="card border-dark mb-3">
            <Card.Img variant="top" src={props.media} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    Tuition: ${props.tuition} <br></br>
                    Rank: {props.rank} <br></br>
                    Graduation Rate: {props.graduation_rate}% <br></br>
                    Acceptance Rate: {props.acceptance_rate}% <br></br>
                    City: {props.city} <br></br>
                </Card.Text>
            </Card.Body>
            </Card>
        </Container>
        <h2 style = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            Check out jobs in the same city!
        </h2>;
        {/* <Jobs/> */}
        <h2 style = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            Check out housing in the same city!
        </h2>;
        {/* <Housing/> */}
        </div>
    )
}

export default CollegeInstance