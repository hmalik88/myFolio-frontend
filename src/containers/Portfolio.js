import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import NavBar from '../components/Navbar';
import BuyForm from '../components/BuyForm';
import '../scss/Portfolio.scss';

function Portfolio() {

  useEffect(() => {
    let root = document.querySelector('#root');
    root.className = 'portfolio-root';
  }, []);

  return(
    <>
      <NavBar />
      <Container className='portfolio-page-container text-center'>
        <Row>
          <Col xs='7' className='portfolio-section'>
            <h2 className='portfolio-header'>Portfolio ($5000.00)</h2>
          </Col>
          <Col xs='5' className='buy-form-section'>
            <h2 className='cash-balance'>Cash - $4000.00</h2>
            <BuyForm />
          </Col>
        </Row>
      </Container>
    </>
    )
}

export default Portfolio;
