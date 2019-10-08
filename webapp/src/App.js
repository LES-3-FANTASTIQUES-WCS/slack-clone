<<<<<<< HEAD
import React from 'react';
import './App.css';
import TheHeader from './components/Header/TheHeader';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <TheHeader />
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
>>>>>>> add assert
}

export default App;
