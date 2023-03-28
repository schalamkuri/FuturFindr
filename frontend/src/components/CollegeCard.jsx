import React from "react";
import Card from "react-bootstrap/Card";
import { Highlight } from "react-highlight-regex";

function CollegeCard(props) {

  // FUNCTION FROM GEO JOBS REPO AND SLIGHTLY EDITED
  // highlightes part of input that matches regex expression
  function highlightText(input) {
    if (props.regex != null && input != null) {
      return <Highlight match={props.regex} text={input} />;
    }

    return input;
  }

  return (
    <Card className="card border-dark mb-3" style={{ height: "90%" }}>
      <Card.Img variant="top" src={props.img_url} />
      <Card.Body>
        <Card.Title>{highlightText(props.name)}</Card.Title>
        <Card.Text>
          Instate Tuition: ${props.instateTuition ? props.instateTuition : "~"}{" "}
          <br></br>
          Outstate Tuition: $
          {props.outstateTuition ? props.outstateTuition : "~"} <br></br>
          Admission Rate:{" "}
          {props.admissionRate
            ? Math.trunc(props.admissionRate * 100)
            : "~"}% <br></br>
          City: {highlightText(props.city)} <br></br>
        </Card.Text>
        <a href={`/colleges/${props.id}`} class="stretched-link"></a>
      </Card.Body>
    </Card>
  );
}

export default CollegeCard;
