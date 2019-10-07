import React, { useEffect, useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import logo from '../assets/myfoliologo.svg'
import '../scss/Register.scss';

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formText, setFormText] = useState('');

  useEffect(() => {
    const root = document.querySelector('#root');
    root.className = 'register-root';
  }, [])

  const handleEmailChange = e => {
    setFormText('');
    setEmail(e.target.value);
  };
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleRegistration = e => {
    e.preventDefault()
    const exp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!email.match(exp)) return setFormText('Please enter a valid e-mail.');
    const user = {
      user: {
        email: email,
        password: password
      }
    }
    fetch('http://localhost:3000/api/v1/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('That e-mail is already taken, please choose another.')
      }
    })
    .then(json => {
      localStorage.setItem("token", json.jwt)
      props.history.push('/portfolio')
    })
    .catch(error => {
      const formText = document.querySelector('.register-row .form-text')
      formText.classList.remove('text-muted');
      formText.classList.add('error-form-text');
      setFormText(error.message)
    })
  }

  return (
    <>
      <img src={logo} className='register-logo' alt='' />
      <RegisterForm
        email={email}
        password={password}
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleRegistration={handleRegistration}
        formText={formText}
      />
    </>
    )
}

export default Register;
