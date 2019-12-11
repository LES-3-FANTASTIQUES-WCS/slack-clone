import React, { useState } from 'react';

const signUp = async event => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username');
  const password = formData.get('password');
  const response = await fetch('/api/users', {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (response.ok) {
    console.log('res ok');
  } else {
    console.log('res error');
  }
};

const SignupForm = () => {
  return (
    <form onSubmit={signUp}>
      <label>
        Nom d'utilisateur :
        <input type="text" name="username" />
      </label>
      <label>
        Mot de passe :
        <input type="password" name="password" />
      </label>
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default SignupForm;
