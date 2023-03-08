import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const DevCard = (inputUser) => {
  return (
    <Card>
      <Card.Img variant="top" src={inputUser?.inputUser?.pic ?? "fsf"} />
        <Tabs
        defaultActiveKey="about"
        id="devcard-tabs"
        className="mb-3"
        justify
        >
            <Tab eventKey="about" title="About">
                <Card.Body>
                        <Card.Title>{inputUser?.inputUser?.name}</Card.Title>
                        <Card.Text>Role: {inputUser?.inputUser?.role}</Card.Text>
                        <Card.Text>{inputUser?.inputUser?.bio}</Card.Text>
                </Card.Body>
            </Tab>
            <Tab eventKey="GitLab" title="GitLab"> 
                <Card.Body>
                    <Card.Title>@{inputUser?.inputUser?.gitlab}<br /></Card.Title>
                    Commits: {inputUser?.inputUser?.commits}<br />
                    Issues: {inputUser?.inputUser?.issues}<br />
                    Unit Tests: {inputUser?.inputUser?.tests}
                </Card.Body>
            </Tab>
        </Tabs>
    </Card>
  );
}

export default DevCard;