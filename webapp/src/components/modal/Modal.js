import React from 'react';
import { Modal, Button, Form, Icon } from 'semantic-ui-react';

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      name: '',
      text: '',
      nameError: '',
      textError: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  //post new channel to server
  addChannels(channelsName) {
    const isValid = this.validate();
    if (isValid) {
      fetch('/api/channels', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: channelsName }),
      }).then(() => {
        this.props.getChannels();
        this.setState({ name: '', text: '' });
        this.handleClose();
      });
    }
  }

  validate() {
    let nameError = '';
    let textError = '';

    if (!this.state.name) {
      nameError = 'Vous devez entrer un nom de chaîne';
    } else if (this.state.name.length < 3) {
      nameError = 'Votre nom de chaîne doit au moins faire 3 caractères';
    }
    if (!this.state.text) {
      textError = 'Vous devez préciser le but de votre chaîne';
    } else if (this.state.text.length < 20) {
      textError = 'Votre présentation doit au moins faire 20 caractères';
    }

    if (nameError || textError) {
      this.setState({ nameError, textError });
      return false;
    }
    return true;
  }

  render() {
    return (
      <Modal
        size="tiny"
        open={this.state.modalOpen}
        onClose={this.handleClose}
        style={{ zIndex: '4' }}
        trigger={
          <button style={{ backgroundColor: '#1B1C1D', border: 'none' }}>
            {' '}
            <Icon
              onClick={this.handleOpen}
              style={{
                marginLeft: '-3em',
                fontSize: '1.5em',
                cursor: 'pointer',
              }}
              inverted
              name="add"
            />
          </button>
        }
        closeIcon
      >
        <Modal.Header>Créer une chaîne de discussion</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={() => this.addChannels(this.state.name)}>
              <Form.Field>
                <label>Nom de la chaîne</label>
                <input
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  pattern="^(?!\s*$|\s).*$"
                />
                <p style={{ color: '#A52A2A' }}>{this.state.nameError}</p>
              </Form.Field>
              <Form.Field>
                <label>Présentation de la chaîne</label>
                <input
                  value={this.state.text}
                  onChange={this.handleTextChange}
                  pattern="^(?!\s*$|\s).*$"
                />
                <p style={{ color: '#A52A2A' }}>{this.state.textError}</p>
              </Form.Field>
              <Form.Field
                style={{ marginBottom: '1em' }}
                floated="right"
                type="submit"
                control={Button}
                primary
              >
                Créer la chaîne
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddModal;
