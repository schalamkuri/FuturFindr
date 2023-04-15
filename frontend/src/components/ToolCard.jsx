import {Card, Button} from 'react-bootstrap';

const ToolCard = (inputTool) => {
  return (
    <Card>
      <Card.Img variant="top" src={inputTool?.inputTool?.pic} />
            <Card.Body>
                <Card.Title>{inputTool?.inputTool?.name}<br /></Card.Title>
                <Card.Text>{inputTool?.inputTool?.desc}</Card.Text>
                <Button variant="primary" href={inputTool?.inputTool?.link} target="_blank">Link</Button>
            </Card.Body>
    </Card>
  );
}

export default ToolCard;