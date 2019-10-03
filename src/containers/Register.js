import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../scss/Register.scss';

function Register() {

  useEffect(() => {
    let root = document.querySelector('#root');
    root.className = 'register-root';
  }, [])

  return (
    <Container fluid>
      <Row>
        <Col className='justify-content-center align-items-center'>

        </Col>
      </Row>
    </Container>
    )
}

export default Register;
