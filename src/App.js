import React, {useState, useEffect} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Landing from './containers/Landing';
import Login from './containers/Login';
import Register from './containers/Register';
import Portfolio from './containers/Portfolio';
import Transactions from './containers/Transactions';
import './scss/App.scss';

function App(props) {

  const [user, setUser] = useState({user: {}, transactions: []});
  const [loginFormText, setLoginFormText] = useState('');
  const [registerEmailText, setRegisterEmailText] = useState('');
  const [registerNameText, setRegisterNameText] = useState('');
  const [registerPasswordText, setRegisterPasswordText] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token !== null) {
        const response = await fetch('http://localhost:3000/api/v1/current_user', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Action: "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json());
      setUser(response);
      } else {
        if (props.history.location.pathname === '/register' || '/login') return;
        props.history.push('/')
      }
    }
    fetchUser();
  }, [props.history])


  const handleLogin = (e, email, password) => {
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
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Invalid e-mail or password.')
      }
    })
    .then(json => {
      localStorage.setItem("token", json.jwt)
      setUser({user: json.user, transactions: json.transactions});
      props.history.push('/portfolio')
    })
    .catch(error => {
      const formText = document.querySelector('.login-row .form-text')
      formText.classList.remove('text-muted');
      formText.classList.add('error-form-text');
      setLoginFormText(error.message)
    })
  }

  const handleRegistration = (e, name, email, password) => {
    e.preventDefault()
    const exp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const nameText = document.querySelector('.register-name-text');
    const emailText = document.querySelector('.register-email-text');
    const passwordText = document.querySelector('.register-password-text');
    [nameText, emailText, passwordText].forEach(el => {
      el.classList.remove('text-muted');
      el.classList.add('error-form-text');
    })
    if (!email.match(exp)) setRegisterEmailText('Please enter a valid e-mail.');
    if (name === '') setRegisterNameText('Please enter a valid name.');
    if (password === '') setRegisterPasswordText('Please enter a valid password.');
    if (!password || !name || !password) return;
    const user = {
      user: {
        name: name,
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
      setUser({user: json.user, transactions: json.transactions});
      props.history.push('/portfolio')
    })
    .catch(error => {
      const formText = document.querySelector('.register-row .form-text')
      formText.classList.remove('text-muted');
      formText.classList.add('error-form-text');
      setRegisterEmailText(error.message)
    })
  }


  return (
    <>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' render={() => <Login {...props} handleLogin={handleLogin} loginFormText={loginFormText} setLoginFormText={setLoginFormText} />} />
        <Route exact path='/register' render={() => <Register {...props} handleRegistration={handleRegistration} registerEmailText={registerEmailText} setRegisterEmailText={setRegisterEmailText} registerPasswordText={registerPasswordText} registerNameText={registerNameText} setRegisterPasswordText={setRegisterPasswordText} setRegisterNameText={setRegisterNameText} />} />
        <Route exact path='/portfolio' render={() => <Portfolio user={user} {...props} />} />
        <Route exact path='/transactions' render={() => <Transactions user={user} />} />
      </Switch>
    </>
  );
}

export default withRouter(App);
