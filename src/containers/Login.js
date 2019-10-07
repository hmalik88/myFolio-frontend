import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../assets/myfoliologo.svg'
import '../scss/Login.scss';

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formText, setFormText] = useState('');

  useEffect(() => {
    let root = document.querySelector('#root');
    root.className = 'login-root';
  }, [])

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleLogin = e => {
    e.preventDefault()
    const login = {
      user: {
        "email": email,
        "password": password
      }
    }
    fetch('http://localhost:3000/api/v1/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(login)
    })
    .then(res => res.json())
    .then(json => {
      localStorage.setItem("token", json.jwt)
    })
    .then(() => {
      props.history.push("/home")
    })
  }

  return (
    <>
      <img src={logo} className='login-logo' alt ='' />
      <LoginForm
        email={email}
        password={password}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        formText={formText}
        handleLogin={handleLogin}
      />
    </>
    )
}

export default Login;
