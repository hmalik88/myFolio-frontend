import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import tree from '../assets/tree.svg';
import logo from '../assets/myfoliologo.svg'
import '../scss/Landing.scss'


function Landing() {

  useEffect(() => {
    let root = document.querySelector('#root');
    root.className = 'landing-root';
  }, [])

  return(
    <Container fluid>
      <Row>
        <Col>
          <img src={tree} alt='' className='tree' />
        </Col>
        <Col className='text-center'>
          <Row>
            <Col>
              <img src={logo} alt='' className='landing-logo' />
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to='/register'>
                <Button className='register-btn'>
                  Sign up
                </Button>
              </Link>
              <Link to='/login'>
                <Button className='login-btn'>
                  Log in
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    )
}

export default Landing;
