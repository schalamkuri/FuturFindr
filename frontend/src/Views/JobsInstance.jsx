import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import { backendApi } from "../Assets/Data/Constants";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';


function JobsInstance() {
    const id = useParams()['id']
    const [job, setJob] = useState([]);
    const [load, setLoad] = useState(false);

    const getJob = async () => {
        try {
          var endpoint = 'jobs/' + id
          const data = await backendApi.get(
            endpoint
          )
          setJob(data.data.data);
          setLoad(true);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        getJob()
      }, [job, load])

    return (
        <div>
        {load ? (
        <Container>
        <Card className="card border-dark mb-3" style={{height: "90%" }}>
        <Card.Img variant="top" src={"https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg"}/>
        <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Text>
                {job.company} <br></br>
                Industry: {job.category} <br></br>
                Location: {job.city} <br></br>
                Pay range: ${job.salary_min}-{job.salary_max} <br></br>
                Date Posted: {job.created} <br></br>
            </Card.Text>
        </Card.Body>
        <Card.Footer>{job.description}</Card.Footer>
        <Button variant="info" href={job.url}>See job listing</Button>
        </Card>
        </Container>
        // <h2 style = {{
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center"
        // }}>
        //     Check out housing in the same city!
        // </h2>;
        // {/* <Housing/> */}
        // <h2 style = {{
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center"
        // }}>
        //     Check out nearby Colleges!
        // </h2>;
        //{/* <Colleges/> */}
        ): (<Spinner animation="border" variant="info"/>)}
        </div> 
    )
}

export default JobsInstance

