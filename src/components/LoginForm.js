import React from 'react';
import { Container, Row, Col, Form, FormGroup, FormText, Input, Label, Button } from 'reactstrap';
import '../scss/LoginForm.scss';

function LoginForm() {
  return(
    <Container className='login-form-container'>
      <Row className='login-row'>
        <Col className='justify-content-center'>
          <Form>
            <h2 className='login-title'>Log in to your account!</h2>
            <FormGroup>
              <Label className='login-label' for='login-email'>E-mail</Label>
              <Input type='email' id='login-email' />
            </FormGroup>
            <FormGroup>
              <Label className='login-label' for='login-password'>Password</Label>
              <Input size='md' id='login-password' type='password' />
            </FormGroup>
            <Button className='login-form-btn text-center'>Log in</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    )
}

export default LoginForm;
