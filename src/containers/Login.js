import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../assets/myfoliologo.svg'
import '../scss/Login.scss';

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const root = document.querySelector('#root');
    root.className = 'login-root';
  }, [])

  const handleEmailChange = e => {
    props.setLoginFormText('');
    setEmail(e.target.value);
  }
  const handlePasswordChange = e => {
    props.setLoginFormText('');
    setPassword(e.target.value);
  }

  return (
    <>
      <img src={logo} className='login-logo' alt ='' />
      <LoginForm
        email={email}
        password={password}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        loginFormText={props.loginFormText}
        handleLogin={props.handleLogin}
      />
    </>
    )
}

export default Login;
