import React, { useEffect, useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import logo from '../assets/myfoliologo.svg'
import '../scss/Register.scss';

function Register() {

  useEffect(() => {
    let root = document.querySelector('#root');
    root.className = 'register-root';
  }, [])

  return (
    <>
      <img src={logo} className='register-logo' alt='' />
      <RegisterForm />
    </>
    )
}

export default Register;
