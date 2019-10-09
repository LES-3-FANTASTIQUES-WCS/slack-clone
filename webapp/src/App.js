<<<<<<< HEAD
import React from 'react';

import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
=======
import React, { Component } from 'react';
import './App.css';
import TheHeader from './components/Header/TheHeader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <TheHeader />;
  }
>>>>>>> fbc69e1e2f5de13628d07b5632e71c5da639181c
}

export default App;
