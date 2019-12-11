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

function Login(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAuthTokens } = useAuth();
  const referer = props.location.state.referer || '/';

  function postLogin() {
    fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => {
        if (response.status === 200) {
          setAuthTokens(document.cookie);
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
    return <Redirect to={referer} />;
  }

  return (
    <Container>
      <Grid centered>
        <Grid.Column mobile={15} tablet={11} computer={7}>
          <Header as="h2" textAlign="center">
            Login
          </Header>

          <Segment>
            <Form size="large">
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Email address"
                name="email"
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
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
              />

              <Button
                fluid
                size="large"
                color="violet"
                type="submit"
                onClick={postLogin}
              >
                Login
              </Button>
            </Form>
          </Segment>

          <Message>
            Not registered yet?{' '}
            <Link className="link" to="/signup">
              Sign Up
            </Link>
            {isError && (
              <Message negative>
                <Message.Header>
                  There was some errors with your submission
                </Message.Header>
                <p>The e-mail or password you submitted is invalid.</p>
              </Message>
            )}
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Login;
