import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../assets/myfoliologo.svg'
import '../scss/Login.scss';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let root = document.querySelector('#root');
    root.className = 'login-root';
  }, [])

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  return (
    <>
      <img src={logo} className='login-logo' alt ='' />
      <LoginForm
        email={email}
        password={password}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        error={error}
      />
    </>
    )
}

export default Login;
