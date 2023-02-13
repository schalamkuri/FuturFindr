import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/fortune-teller.png'
  
  const NavBar = () => {
    return (
      <Navbar
        variant="light"
        expand="lg"
        style={{
          backgroundColor: "#ccccff",
          display: "flex",
          alignItems: "right",
        }}
      >
        <Container>
          <Navbar.Brand href="/">
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <img src={Logo} height={"50px"} width={"50px"} class="img-fluid"></img>
              <h2>FuturFindr</h2>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse style={{ alignItems: "left" }}>
            <Nav className="mr-auto">
              <Nav.Link href="/">
                Home
              </Nav.Link>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  
  export default NavBar;
  