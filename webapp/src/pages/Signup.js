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

function Signup() {
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
              />

              <Form.Input
                fluid
                icon="at"
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

              <Button fluid color="violet" size="large" type="submit">
                Submit
              </Button>
            </Form>
          </Segment>

          <Message>
            Already have an account?{' '}
            <Link className="link" to="/login">
              Sign In
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Signup;
