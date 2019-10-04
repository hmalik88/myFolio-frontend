import React from 'react';
import { Container, Row, Col, Form, FormGroup, FormText, Input, Label, Button } from 'reactstrap';
import '../scss/RegisterForm.scss';

function RegisterForm() {
  return(
    <Container className='register-form-container'>
      <Row className='register-row'>
        <Col className='justify-content-center'>
          <Form>
            <h2 className='register-title'>Sign up for an account!</h2>
            <FormGroup>
              <Label className='register-label' for='register-email'>E-mail</Label>
              <Input type='email' id='register-email' />
            </FormGroup>
            <FormGroup>
              <Label className='register-label' for='register-password'>Password</Label>
              <Input size='md' id='register-password' type='password' />
            </FormGroup>
            <Button className='register-form-btn text-center'>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    )
}

export default RegisterForm;
