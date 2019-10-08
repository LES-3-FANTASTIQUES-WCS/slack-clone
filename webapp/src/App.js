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
}

export default App;
