import React from "react";
import Card from "react-bootstrap/Card";
import { Highlight } from "react-highlight-regex";

function JobCard(props) {
  
  // CODE FROM GEO JOBS REPO AND SLIGHTLY EDITED
  // highlightes part of input that matches regex expression
	function highlightText(input) {
		if (props.regex != null && input != null) {
		  return <Highlight match={props.regex} text={input} />;
		}
		return input;
	}

  return (
    <Card className="card border-dark mb-3" style={{ height: "90%" }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{highlightText(props.title)}</Card.Title>
        <Card.Text>
          Company: {highlightText(props.company)} <br></br>
          Industry: {highlightText(props.category)} <br></br>
          Location: {highlightText(props.location)} <br></br>
          Pay range: ${props.salaryMin} {props.salaryMax != props.salaryMin && "- $" + props.salaryMax} <br></br>
          Date Posted: {props?.datePosted?.split("T")[0]} <br></br>
        </Card.Text>
        <a href={`/jobs/${props.id}`} className="stretched-link"></a>
      </Card.Body>
    </Card>
  );
}
export default JobCard;
