import React from "react";
import { useParams } from 'react-router'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { HousingList } from "../Assets/Data/HousingData";
import { HousingMap } from "../Assets/Data/HousingMap";
import Jobs from "./jobs";

function HousingInstance() {
    const params = useParams()
    let id = params['id']
    let props = HousingList[HousingMap[id]]

    return (
        <div>
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
        <Jobs/>
        </div>
    )
}

export default HousingInstance

