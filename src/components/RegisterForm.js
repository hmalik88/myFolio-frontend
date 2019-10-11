import React from 'react';
import { Container, Row, Col, Form, FormGroup, FormText, Input, Label, Button } from 'reactstrap';
import '../scss/RegisterForm.scss';

function RegisterForm(props) {
  return(
    <Container className='register-form-container'>
      <Row className='register-row'>
        <Col className='justify-content-center'>
          <Form onSubmit={e => props.handleRegistration(e, props.name, props.email, props.password)}>
            <h2 className='register-title'>Sign up for an account!</h2>
            <FormGroup>
              <Label className='register-label' for='register-name'>Name</Label>
              <Input autoComplete='off' value={props.name} name='r-name' onChange={props.handleNameChange} type='text' id='register-name' />
              <FormText className='register-name-text'>{props.registerNameText}</FormText>
            </FormGroup>
            <FormGroup>
              <Label className='register-label' for='register-email'>E-mail</Label>
              <Input autoComplete='off' value={props.email} name='r-email' onChange={props.handleEmailChange} type='email' id='register-email' />
              <FormText className='register-email-text'>{props.registerEmailText}</FormText>
            </FormGroup>
            <FormGroup>
              <Label className='register-label' for='register-password'>Password</Label>
              <Input autoComplete='off' value={props.password} name='r-password' onChange={props.handlePasswordChange} bsSize='md' id='register-password' type='password' />
              <FormText className='register-password-text'>{props.registerPasswordText}</FormText>
            </FormGroup>
            <Button className='register-form-btn text-center'>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    )
}

export default RegisterForm;
