import React, { useEffect, useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import logo from '../assets/myfoliologo.svg'
import '../scss/Register.scss';

function Register(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const root = document.querySelector('#root');
    root.className = 'register-root';
  }, [])

  const handleNameChange = e => {
    props.setRegisterNameText('');
    props.setRegisterEmailText('');
    props.setRegisterPasswordText('');
    setName(e.target.value)
  };

  const handleEmailChange = e => {
    props.setRegisterNameText('');
    props.setRegisterEmailText('');
    props.setRegisterPasswordText('');
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => setPassword(e.target.value);

  return (
    <>
      <img src={logo} className='register-logo' alt='' />
      <RegisterForm
        name={name}
        email={email}
        password={password}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleRegistration={props.handleRegistration}
        registerEmailText={props.registerEmailText}
        registerNameText={props.registerNameText}
        registerPasswordText={props.registerPasswordText}
      />
    </>
    )
}

export default Register;
