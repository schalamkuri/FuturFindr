import Logo from '../Assets/fortune-teller.png';
import { Nav, Navbar, Button, Form, Container } from "react-bootstrap";

// Code is based off of geojobs navigation bar
// https://gitlab.com/sarthaksirotiya/cs373-idb/-/blob/main/front-end/src/components/GlobalNavbar/GlobalNavbar.jsx
  
  const NavigationBar = () => {

    const handleSubmit = (event) => {
      event.preventDefault()
      window.location.assign(`/search/${event.currentTarget.query.value}`)
    }
    return (
      <Navbar
      
        variant="light"
        expand="lg"
        style={{
          backgroundColor: "#84bcdc",
          display: "flex",
          alignItems: "right",
        }}
      >
        <Container>
          <Navbar.Brand href="/">
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <img src={Logo} height={"50px"} width={"50px"} className="img-fluid"></img>
              <h2>FuturFindr</h2>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse style={{ alignItems: "left" }}>
            <Nav className="mr-auto">
              <Nav.Link href="/about">
                About
              </Nav.Link>
              <Nav.Link href="/colleges">
                Colleges
              </Nav.Link>
              <Nav.Link href="/jobs">
                Jobs
              </Nav.Link>
              <Nav.Link href="/housing">
                Housing
              </Nav.Link>
            </Nav>
            <Container className="d-flex justify-content-end">
            <Form onSubmit={handleSubmit} className="d-flex">
              <Form.Control
                style={{ width: "20vw" }}
                type="search"
                name="query"
                placeholder="Colleges, Jobs, & Housing"
                className="me-2"
                aria-label="Search"
              />
              <Button type="submit" variant="outline-secondary">Search</Button>
              {/*style={{color: '#3d405b'}}*/}
            </Form>
          </Container>


          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  
  export default NavigationBar;
  