import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './containers/Landing';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Landing} />
      </Switch>
    </>
  );
}

export default App;
