import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { backendApi } from "../Assets/Data/Constants";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

function CollegeInstance() {
    const id = useParams()['id']
    const [college, setCollege] = useState([]);
    const [load, setLoad] = useState(false);

    const getCollege = async () => {
        try {
        	var endpoint = 'housing/' + id
    		const data = await backendApi.get(
            	endpoint
          	)
			setCollege(data.data.data);
			setLoad(true);
        } catch (e) {
          	console.log(e);
        }
      };
    
      useEffect(() => {
    	getCollege()
      },)

    return (
        <div>
        {load ? (
            <Container>
            <Card className="card border-dark mb-3" style={{height: "90%" }}>
            <Card.Img variant="top" src={college.img_url ? college.img_url : "https://www.convergemedia.org/wp-content/uploads/2017/01/academia-1000.png"}/>
            <Card.Body>
                <Card.Title>{college.name}</Card.Title>
                <Card.Text>
                    Instate Tuition: ${college.instate_tuition ? college.instate_tuition : "~"} <br></br>
					Outstate Tuition: ${college.outstate_tuition ? college.outstate_tuition : "~"} <br></br>
					Admission Rate: %{college.admission_rate ? Math.trunc(college.admission_rate * 100) : "~"} <br></br>
					City: {college.city} <br></br>
                </Card.Text>
            </Card.Body>
            <Button variant="info" href={college.url}>See College</Button>
            </Card>
            </Container>
            // <h2 style = {{
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center"
            // }}>
            //     Check out jobs in the same city!
            // </h2>;
            // <h2 style = {{
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center"
            // }}>
            //     Check out housing in the same city!
            // </h2>;
        // </div>
        ): (<Spinner animation="border" variant="info"/>)}
        </div> 
    )
}

export default CollegeInstance