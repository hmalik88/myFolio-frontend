import React, { useEffect, useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import logo from '../assets/myfoliologo.svg'
import '../scss/Register.scss';

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const root = document.querySelector('#root');
    root.className = 'register-root';
  }, [])

  const handleEmailChange = e => {
    props.setRegisterFormText('');
    setEmail(e.target.value);
  };
  const handlePasswordChange = e => setPassword(e.target.value);

  return (
    <>
      <img src={logo} className='register-logo' alt='' />
      <RegisterForm
        email={email}
        password={password}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleRegistration={props.handleRegistration}
        registerFormText={props.registerFormText}
      />
    </>
    )
}

export default Register;
