import React, { useState } from 'react';
import {
  SignInBtn,
  SignUpBtn,
  InputName,
  InputPassword,
} from './styles/AuthenticationForm';
import { Container, Header, Message } from 'semantic-ui-react';

const AuthenticationForm = ({ onUserSignedIn }) => {
  const [isInSigninMode, setIsInSigninMode] = useState(true);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [password, setPassword] = useState('');

  const submit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const url = isInSigninMode ? '/api/sessions' : '/api/users';
    setPassword(formData.get('password'));
    if (password.length > 7) {
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
    }
  };

  return (
    <>
      <Header textAlign="center">
        <Header.Content>
          <h1> {isInSigninMode ? 'Connexion' : 'Inscription'}</h1>
        </Header.Content>
      </Header>
      <form onSubmit={submit}>
        <Container textAlign="center">
          <InputName name="username" placeholder="Nom d'utilisateur" />
        </Container>
        <Container textAlign="center">
          <InputPassword
            type="password"
            name="password"
            placeholder="Mot de passe"
          />
        </Container>
        <Container textAlign="center">
          <SignUpBtn
            type="button"
            onClick={() => {
              setIsInSigninMode(!isInSigninMode);
            }}
          >
            {isInSigninMode ? "S'inscrire" : 'Se connecter'}
          </SignUpBtn>
          <SignInBtn
            onClick={() => {
              setisSubmitted(true);
            }}
            type="submit"
          >
            {isInSigninMode ? 'Se connecter' : "S'inscrire"}
          </SignInBtn>
        </Container>
      </form>
      {isSubmitted && password.length < 8 ? (
        <Message negative compact>
          <p className="text">
            Le mot de passe doit contenir au minimum 8 caractères.
          </p>
        </Message>
      ) : (
        ''
      )}
    </>
  );
};

export default AuthenticationForm;
