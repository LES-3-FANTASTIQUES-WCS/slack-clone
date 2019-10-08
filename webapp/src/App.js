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
}

export default App;
