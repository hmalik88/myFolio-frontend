import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './containers/Landing';
import Login from './containers/Login';
import Register from './containers/Register';
import Portfolio from './containers/Portfolio';
import Transactions from './containers/Transactions';
import './scss/App.scss';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/portfolio' component={Portfolio} />
        <Route exact path='/transactions' component={Transactions} />
      </Switch>
    </>
  );
}

export default App;
