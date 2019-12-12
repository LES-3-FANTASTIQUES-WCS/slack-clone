import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import AuthenticationForm from './components/AuthenticationForm';

function App() {
  return (
    <div className="App">
      <Route path="/authentication" component={AuthenticationForm} />
      <Redirect to="/authentication" />
    </div>
  );
}

export default App;
