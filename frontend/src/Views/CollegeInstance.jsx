import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { backendApi } from "../Assets/Data/Constants";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner';
import "./connections.css"

function CollegeInstance() {
    // state
    const id = useParams()['id']
    const [college, setCollege] = useState([]);
    const [load, setLoad] = useState(false);

    // function to get specific college instance from backend
    const getCollege = async () => {
        try {
        	var endpoint = 'colleges/' + id
    		const data = await backendApi.get(
            	endpoint
          	)
            // make the url external if it is not already
            if (data.data.data.url[0] == 'w') {
                data.data.data.url = "http://" + data.data.data.url
            }
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
            <Card.Img variant="top" src={college.img_url ? college.img_url : 
                "https://www.convergemedia.org/wp-content/uploads/2017/01/academia-1000.png"}/>
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
            {college.nearby_jobs.length !== 0 ? (
            <>
            <div className="title-holder">
            <h2>Jobs</h2>
            <div className="subtitle">Checkout nearby jobs</div>
            </div>
            <Row className='portfoliolist'>
            {
                college.nearby_jobs.map(job => {
                    return (
                    <Col sm={4} key={job.id}>
                    <div className='portfolio-wrapper'>
                        <a href={`/jobs/${job.id}`} >
                        <Image src={job.img_url ? job.img_url : 
                            "https://thumbs.dreamstime.com/b/cv-writing-job-application-resume-gray-icon-vector-graphics-various-use-187075464.jpg"} />
                        <div className='label text-center'>
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                        </div>
                        </a>
                    </div>
                    </Col>
                    );
                })
            }
            </Row>
            </>
            ): null}
            {college.nearby_housing.length !== 0 ? (
            <>
            <div className="title-holder">
            <h2>Housing</h2>
            <div className="subtitle">Checkout nearby housing</div>
            </div>
            <Row className='portfoliolist'>
            {
                college.nearby_housing.map(housing => {
                    return (
                    <Col sm={4} key={housing.id}>
                        <div className='portfolio-wrapper'>
                        <a href={`/housing/${housing.id}`} >
                            <Image src={housing.img_url ? housing.img_url : 
                                "https://www.pngkit.com/png/detail/413-4134663_house-vector-library-house-clipart-grey.png"} />
                            <div className='label text-center'>
                            <h3>{housing.address}</h3>
                            <p>{housing.property_type}</p>
                            </div>
                        </a>
                        </div>
                    </Col>
                    );
                })
            }
            </Row>
            </>
            ): null}
            </Container>
        ): (<Spinner animation="border" variant="info"/>)}
        </div> 
    )
}

export default CollegeInstance