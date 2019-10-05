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
    return;
  }

  return (
    <>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' render={() => <Register {...props} />} />
        <Route exact path='/portfolio' component={Portfolio} />
        <Route exact path='/transactions' component={Transactions} />
      </Switch>
    </>
  );
}

export default withRouter(App);
