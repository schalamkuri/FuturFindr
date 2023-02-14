import React from "react";
import Splash from "../Assets/Splash.png";
import CollegeImage from "../Assets/11111UnivTexas.jpg"
import JobImage from "../Assets/jobs.jpg"
import AptImage from "../Assets/Apt.webp"
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardGroup';
import "./home.css"

function Home() {
  return (
    <div>
      <Card className="center">
        <Card.Img src={Splash} />
        <Card.ImgOverlay className="bigText">
          <h1>
            What's in your future?
          </h1>
        </Card.ImgOverlay>
        
      </Card>
      <CardDeck className="deck">
      <Card className="deck">
        <Card.Img variant="top" src={CollegeImage} />
        <Card.Body>
          <Card.Title>Colleges</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="deck">
        <Card.Img variant="top" src={JobImage} />
        <Card.Body>
          <Card.Title>Jobs</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="deck">
        <Card.Img variant="top" src={AptImage} />
        <Card.Body>
          <Card.Title>Housing</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
      </Card>
      </CardDeck>
    </div>
  );
}

export default Home;
