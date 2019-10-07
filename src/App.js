import React, {useState, useEffect} from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Landing from './containers/Landing';
import Login from './containers/Login';
import Register from './containers/Register';
import Portfolio from './containers/Portfolio';
import Transactions from './containers/Transactions';
import './scss/App.scss';

function App(props) {

  const [user, setUser] = useState({})

  useEffect(() => {
    fetchUser();
  }, [])

  const fetchUser = () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      fetch('http://localhost:3000/api/v1/current_user', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Action: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(json => {
      setUser({user: json.user, transactions: json.transactions})
    })
    } else {
      props.history.push('/')
    }
  }

  return (
    <>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' render={() => <Login {...props} />} />
        <Route exact path='/register' render={() => <Register {...props} />} />
        <Route exact path='/portfolio' render={() => <Portfolio user={user} />} />
        <Route exact path='/transactions' render={() => <Transactions user={user} />} />
      </Switch>
    </>
  );
}

export default withRouter(App);
