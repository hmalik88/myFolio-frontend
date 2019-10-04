import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../assets/myfoliologo.svg'
import '../scss/Login.scss';

function Login() {

  useEffect(() => {
    let root = document.querySelector('#root');
    root.className = 'login-root';
  }, [])

  return (
    <>
      <img src={logo} className='login-logo' alt ='' />
      <LoginForm />
    </>
    )
}

export default Login;
