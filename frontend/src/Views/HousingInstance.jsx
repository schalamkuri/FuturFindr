import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { backendApi } from "../Assets/Data/Constants";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Carousel from 'react-bootstrap/Carousel'
import Spinner from 'react-bootstrap/Spinner';
import "./connections.css"


function HousingInstance() {
    const id = useParams()['id']
    const [house, setHouse] = useState([]);
    const [load, setLoad] = useState(false);
	const [items, setItems] = useState([])

    const getHouse = async () => {
        try {
        	var endpoint = 'housing/' + id
    		const data = await backendApi.get(
            	endpoint
          	)
			setHouse(data.data.data);
			setLoad(true);
			// Create carousel items for each image
			var items = []
			for (var i = 0; i < house.images.length; i++) {
				items.push(
					<Carousel.Item>
						<img className="d-block w-100 img-carousel" src={house.images[i].img_url} />
					</Carousel.Item>
				);
			}
			setItems(items)

        } catch (e) {
          	console.log(e);
        }
      };
    
      useEffect(() => {
    	getHouse()
      },)

    return (
        <div>
        {load ? (
        <Container>
        <Card className="card border-dark mb-3" style={{height: "90%"}}>
        <Card.Img variant="top" src={house.images.img_url} />
        {house.images.length === 0 ? 
			<Card.Img variant="top" src={"https://www.pngkit.com/png/detail/413-4134663_house-vector-library-house-clipart-grey.png"} /> :
			<Carousel slide={false}>
				{items}
			</Carousel>
		}
        <Card.Body>
            <Card.Title>{house.address}</Card.Title>
            <Card.Text>
                {house.property_type} <br></br>
                City: {house.city} <br></br>
                Monthly Rent: ${house.price} <br></br>
                Beds: {house.bedrooms ? house.bedrooms : "Unknown"} <br></br>
                Baths {house.bathrooms ? house.bedrooms : "Unknown"} <br></br>
            </Card.Text>
        </Card.Body>
        </Card>
        <div className="title-holder">
          <h2>Jobs</h2>
          <div className="subtitle">Checkout nearby jobs</div>
        </div>
        <Row className='portfoliolist'>
          {
            house.nearby_jobs.map(job => {
              return (
                <Col sm={4} key={job.id}>
                  <div className='portfolio-wrapper'>
                    <a href={`/jobs/${job.id}`} >
                      <Image src={"https://thumbs.dreamstime.com/b/cv-writing-job-application-resume-gray-icon-vector-graphics-various-use-187075464.jpg"} />
                      <div className='label text-center'>
                        <h3>{job.title}</h3>
                        <p>{job.property_type}</p>
                      </div>
                    </a>
                  </div>
                </Col>
              );
            })
          }
        </Row>
        </Container>

        ): (<Spinner animation="border" variant="info"/>)}

        {/* <Container>
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
        <h2 style = {{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            Check out nearby Colleges!
        </h2>; */}

        </div>
    )
}

export default HousingInstance

