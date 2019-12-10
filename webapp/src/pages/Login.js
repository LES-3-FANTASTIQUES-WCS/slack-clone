import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Container,
} from 'semantic-ui-react';

function Login() {
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
              />

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
              />

              <Button fluid size="large" color="violet" type="submit">
                Login
              </Button>
            </Form>
          </Segment>

          <Message>
            Not registered yet?{' '}
            <Link className="link" to="/signup">
              Sign Up
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Login;
