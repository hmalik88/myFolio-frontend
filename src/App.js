import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './containers/Landing';
import Register from './containers/Register'

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </>
  );
}

export default App;
