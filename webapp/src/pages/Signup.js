import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useAuth } from '../context/auth';

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container,
} from 'semantic-ui-react';

function Signup() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUserNameError, setIsUserNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useAuth();

  const errorList = [];

  if (isUserNameError) {
    errorList.push('Username is required');
  }

  if (isEmailError) {
    errorList.push('Email must be valid');
  }

  if (isPasswordError) {
    errorList.push('Password must be 8 characters long');
  }

  function postSignup() {
    const emailIsValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      email
    );

    let error = false;

    if (userName === '') {
      setIsUserNameError(true);
      error = true;
    } else {
      setIsUserNameError(false);
    }

    if (emailIsValid) {
      setIsEmailError(false);
    } else {
      setIsEmailError(true);
      error = true;
    }

    if (password.length < 8) {
      setIsPasswordError(true);
      error = true;
    } else {
      setIsPasswordError(false);
    }

    if (error) {
      setIsError(true);
      return;
    }

    setIsError(false);

    fetch('api/user/signup', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        userName,
        email,
        password,
      }),
    })
      .then(result => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch(e => {
        setIsError(true);
      });
  }

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Grid centered>
        <Grid.Column mobile={15} tablet={11} computer={7}>
          <Header as="h2" textAlign="center">
            Register
          </Header>

          <Segment>
            <Form size="large">
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                value={userName}
                onChange={e => {
                  setUserName(e.target.value);
                }}
                error={isUserNameError}
              />

              <Form.Input
                fluid
                icon="at"
                iconPosition="left"
                placeholder="Email address"
                name="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                error={isEmailError}
              />

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                error={isPasswordError}
              />

              <Button
                fluid
                color="violet"
                size="large"
                type="submit"
                onClick={postSignup}
              >
                Submit
              </Button>
            </Form>
          </Segment>

          <Message>
            Already have an account?{' '}
            <Link className="link" to="/login">
              Sign In
            </Link>
            {isError || isUserNameError || isEmailError || isPasswordError ? (
              <Message
                error
                header="There was some errors with your submission"
                list={errorList}
              />
            ) : null}
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Signup;
