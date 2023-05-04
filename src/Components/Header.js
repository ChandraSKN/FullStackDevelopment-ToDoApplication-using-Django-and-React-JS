import React from "react";
import { Container, Navbar, Nav} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
 
  return (
    <Navbar bg="primary" variant="dark" expand="lg" style={{ border: '1px solid black' }}>
      <Container fluid className="d-flex justify-content-between align-items-center" >
        <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>To Do Application</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           
              {/* <Nav.Link style={{ cursor: 'pointer' }} onClick={() => navigate("/home")}>Home</Nav.Link> */}
          
          </Nav>
        </Navbar.Collapse>


      </Container>
     
    </Navbar>
  );
}

export default Header;
