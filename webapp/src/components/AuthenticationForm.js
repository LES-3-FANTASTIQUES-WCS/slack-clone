import React, { useState } from 'react';

const AuthenticationForm = ({ onUserSignedIn }) => {
  const [isInSigninMode, setIsInSigninMode] = useState(true);

  const submit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const url = isInSigninMode ? '/api/sessions' : '/api/users';
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.ok) {
      if (isInSigninMode) {
        onUserSignedIn();
      } else {
        setIsInSigninMode(true);
      }
    }
  };

  return (
    <>
      <h1>{isInSigninMode ? 'Connexion' : 'Inscription'}</h1>
      <form onSubmit={submit}>
        <label>
          Nom d'utilisateur :
          <input type="text" name="username" />
        </label>
        <label>
          Mot de passe :
          <input type="password" name="password" />
        </label>
        <button type="submit">
          {isInSigninMode ? 'Se connecter' : "S'inscrire"}
        </button>
      </form>
      <button
        onClick={() => {
          setIsInSigninMode(!isInSigninMode);
        }}
      >
        {isInSigninMode ? "S'inscrire" : 'Se connecter'}
      </button>
    </>
  );
};

export default AuthenticationForm;
