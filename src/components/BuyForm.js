import React from 'react';
import { Container, Row, Col, Form, FormGroup, FormText, Input, Label, Button } from 'reactstrap';
import '../scss/BuyForm.scss';

function BuyForm() {
  return(
    <Container className='buy-form-container'>
      <Row className='buy-row'>
        <Col className='buy-col justify-content-center'>
          <Form>
            <FormGroup className='text-left'>
              <Label for='ticker' className='buy-label'>Ticker</Label>
              <Input type='text' id='ticker' />
            </FormGroup>
            <FormGroup className='text-left'>
              <Label for='buy-qty' className='buy-label'>Quantity</Label>
              <Input type='number' id='buy-qty' />
            </FormGroup>
            <Button className='buy-btn'>Buy</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    )

}

export default BuyForm;
