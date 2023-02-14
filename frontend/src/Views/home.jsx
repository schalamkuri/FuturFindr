import React from "react";
import Splash from "../Assets/HomePage/Splash.png";
import CollegeImage from "../Assets/HomePage/Campus.jpg"
import JobImage from "../Assets/HomePage/Jobs.jpg"
import AptImage from "../Assets/HomePage/Apt.jpg"
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardGroup';
import "./home.css"

function Home() {
  return (
    <div>
      <Card style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Card.Img src={Splash} />
        <Card.ImgOverlay className="bigText">
          <h1>
            What's in your future?
          </h1>
        </Card.ImgOverlay>
        
      </Card>
      <CardDeck>
      <Card className="card border-dark mb-3">
        <Card.Img variant="top" src={CollegeImage} />
        <Card.Body>
          <Card.Title>Colleges</Card.Title>
          <Card.Text>
            Find the perfect place to further your education!
          </Card.Text>
        </Card.Body>
        <a href="colleges" class="stretched-link"></a>
      </Card>
      <Card className="card border-dark mb-3">
        <Card.Img variant="top" src={JobImage}/>
        <Card.Body>
          <Card.Title>Jobs</Card.Title>
          <Card.Text>
            Match with the place where your skills are needed!
          </Card.Text>
        </Card.Body>
        <a href="jobs" class="stretched-link"></a>
      </Card>
      <Card className="card border-dark mb-3">
        <Card.Img variant="top" src={AptImage} />
        <Card.Body>
          <Card.Title>Housing</Card.Title>
          <Card.Text>
            The home of your dreams is waiting!
          </Card.Text>
        </Card.Body>
        <a href="housing" class="stretched-link"></a>
      </Card>
      </CardDeck>
    </div>
  );
}

export default Home;
