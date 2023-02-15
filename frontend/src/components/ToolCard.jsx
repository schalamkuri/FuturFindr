import Card from 'react-bootstrap/Card';

const ToolCard = (inputTool) => {
  return (
    <Card>
      <Card.Img variant="top" src={inputTool.inputTool.pic} />
            <Card.Body>
                <Card.Title>{inputTool.inputTool.name}<br /></Card.Title>
                <Card.Text>{inputTool.inputTool.desc}</Card.Text>
            </Card.Body>
    </Card>
  );
}

export default ToolCard;