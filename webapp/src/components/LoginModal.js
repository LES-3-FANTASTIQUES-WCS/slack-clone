import React from 'react';
import { Modal, Icon, Form, Button } from 'semantic-ui-react';
import { ModalWrapper } from './styles/Channels';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      username: '',
      password: '',
      userError: '',
      passwordError: '',
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  login() {
    fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    }).then(() => {
      console.log(this.state.username, this.state.password);
      this.setState({ username: '', password: '' });
      // this.handleClose();
    });
  }

  render() {
    return (
      <ModalWrapper
        closeIcon
        centered
        size="small"
        open={this.state.modalOpen}
        onClose={this.handleClose}
        style={{ zIndex: '4' }}
        trigger={
          <Icon
            onClick={this.handleOpen}
            style={{
              color: '#000000',
              fontSize: '1.5em',
              marginLeft: '4em',
              cursor: 'pointer',
            }}
            inverted
            name="user"
          />
        }
      >
        <Modal.Header>Connectez-vous</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={() => this.login()}>
              <Form.Field>
                <label>Nom d'utilisateur</label>
                <input
                  className="form-control"
                  value={this.state.username}
                  onChange={this.handleChangeUsername}
                />
                <p style={{ color: '#A52A2A' }}>{this.state.userError}</p>
              </Form.Field>
              <Form.Field>
                <label>Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                />
                <p style={{ color: '#A52A2A' }}>{this.state.passwordError}</p>
              </Form.Field>
              <Form.Field
                style={{ marginBottom: '1em' }}
                type="submit"
                control={Button}
                primary
              >
                Accéder à mon espace
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </ModalWrapper>
    );
  }
}

export default LoginModal;
