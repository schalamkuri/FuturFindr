import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const APICard = (inputAPI) => {
  return (
    <Card>
      <Card.Img variant="top" src={inputAPI.inputAPI.pic} />
            <Card.Body>
                <Card.Title>{inputAPI.inputAPI.name}<br /></Card.Title>
                <Card.Text>{inputAPI.inputAPI.desc}</Card.Text>
                <Button variant="primary" href={inputAPI.inputAPI.link}>Link</Button>
            </Card.Body>
    </Card>
  );
}

export default APICard;