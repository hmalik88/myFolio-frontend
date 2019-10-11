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
              <Input value={props.name} onChange={props.handleNameChange} type='text' id='register-name' />
            </FormGroup>
            <FormGroup>
              <Label className='register-label' for='register-email'>E-mail</Label>
              <Input value={props.email} onChange={props.handleEmailChange} type='email' id='register-email' />
              <FormText>{props.registerFormText}</FormText>
            </FormGroup>
            <FormGroup>
              <Label className='register-label' for='register-password'>Password</Label>
              <Input value={props.password} onChange={props.handlePasswordChange} bsSize='md' id='register-password' type='password' />
            </FormGroup>
            <Button className='register-form-btn text-center'>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    )
}

export default RegisterForm;
