import React, { useState } from 'react';

const AuthenticationForm = () => {
  const [shouldShowSigninForm, setShouldShowSigninForm] = useState(true);

  const submit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const url = shouldShowSigninForm ? '/api/sessions' : '/api/users';
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.ok) {
      setShouldShowSigninForm(true);
    } else {
      console.log('res error');
    }
  };

  return (
    <>
      <h1>{shouldShowSigninForm ? 'Connexion' : 'Inscription'}</h1>
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
          {shouldShowSigninForm ? 'Se connecter' : "S'inscrire"}
        </button>
      </form>
      <button
        onClick={() => {
          setShouldShowSigninForm(!shouldShowSigninForm);
        }}
      >
        {shouldShowSigninForm ? "S'inscrire" : 'Se connecter'}
      </button>
    </>
  );
};

export default AuthenticationForm;
