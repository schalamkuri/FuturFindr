import React from "react";
import { useParams } from 'react-router'
import { JobsList } from "../Assets/Data/JobsData"
import { JobsMap } from "../Assets/Data/JobsMap";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Housing from "./housing";
import Colleges from "./colleges";


function JobsInstance() {
    const params = useParams()
    let id = params['id']
    let props = JobsList[JobsMap[id]]

    return (
        <div>
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
          </Card.Body>
        </Card>
        </Container>
        <h2 style = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            Check out housing in the same city!
        </h2>;
        {/* <Housing/> */}
        <h2 style = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            Check out nearby Colleges!
        </h2>;
        {/* <Colleges/> */}
        </div>
    )
}

export default JobsInstance

