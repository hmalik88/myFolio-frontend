import React, { useEffect, useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import logo from '../assets/myfoliologo.svg'
import '../scss/Register.scss';

function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let root = document.querySelector('#root');
    root.className = 'register-root';
  }, [])

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  // const handleSubmission = () => {
  //   if ()
  // }

  return (
    <>
      <img src={logo} className='register-logo' alt='' />
      <RegisterForm
        email={email}
        password={password}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        error={error}
      />
    </>
    )
}

export default Register;
