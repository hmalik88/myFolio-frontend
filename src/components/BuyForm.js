import React from 'react';
import { Container, Row, Col, Form, FormGroup, FormText, Input, Label, Button, Spinner } from 'reactstrap';
import '../scss/BuyForm.scss';

function BuyForm(props) {

  return(
    <Container className='buy-form-container'>
      <Row className='buy-row'>
        <Col className='buy-col justify-content-center'>
          <Form onSubmit={props.handlePurchaseSubmission} className='text-center'>
            <FormGroup className='text-left'>
              <Label for='ticker' className='buy-label'>Ticker</Label>
              <Input autocomplete='off' value={props.ticker} onChange={props.handleTickerChange} type='search' id='ticker' />
              <FormText>
                {props.formText}
              </FormText>
            </FormGroup>
            <FormGroup className='text-left'>
              <Label for='buy-qty' className='buy-label'>Quantity</Label>
              <Input value={props.quantity} onChange={props.handleQuantityChange} type='number' id='buy-qty' />
            </FormGroup>
            <Button className='buy-btn'>Buy</Button>
            <Container className='loader-container'>
              <Spinner size='xl' className='buy-spinner' color='success' />
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
    )

}

export default BuyForm;
