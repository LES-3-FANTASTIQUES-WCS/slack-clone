import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { DASHBOARD_PATH } from './constants';
import Dashboard from './components/Dashboard';
import AuthenticationForm from './components/AuthenticationForm';
import contextCurrentUser from '../src/context/ContextCurrentUser';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [channelActive, setChannelActive] = useState(null);

  const getCurrentUser = async () => {
    const response = await fetch('/api/whoami', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });

    if (response.ok) {
      const _currentUser = await response.json();
      setCurrentUser(_currentUser);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  // useEffect will be called after component mounted

  if (isLoading) {
    return 'Loading…';
  }

  const contextValue = {
    currentUser,
    setCurrentUser,
    getCurrentUser,
    channelActive,
    setChannelActive,
  };

  return (
    <div className="App">
      <contextCurrentUser.Provider value={contextValue}>
        <Route
          path="/authentication"
          component={() => (
            <AuthenticationForm onUserSignedIn={getCurrentUser} />
          )}
        />
        {currentUser ? (
          <>
            <Route
              path={DASHBOARD_PATH}
              component={() => <Dashboard currentUser={currentUser} />}
            />
            <Redirect to={DASHBOARD_PATH} />
          </>
        ) : (
          <Redirect to="/authentication" />
        )}
      </contextCurrentUser.Provider>
    </div>
  );
}

export default App;
