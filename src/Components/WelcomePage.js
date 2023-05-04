import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

function WelcomePage() {
  return (
    <Container className="my-5 text-center">
      <h1>Welcome to My ToDo App</h1>
      <p>This is a simple ToDo app built with React and Django.</p>
      <Link to="/todo">
        <Button variant="primary">Get Started</Button>
      </Link>
    </Container>
  );
}

export default WelcomePage;
