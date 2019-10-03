import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

function Landing() {

  useEffect(() => {
    let root = document.querySelector('#root');
    root.className = 'landing-root';
  }, [])

  return(
    <Container>
      <Row>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
    )
}

export default Landing;
