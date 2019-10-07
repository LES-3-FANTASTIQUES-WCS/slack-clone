import React from 'react';
import { Modal, Button, Form, Icon } from 'semantic-ui-react';

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      name: '',
      text: '',
    };

    this.handleName = this.handleName.bind(this);
    this.handleText = this.handleText.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false});

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleText(event) {
    this.setState({ text: event.target.value });
  }

  //post new channel to server
  addChannels(channelsName, text) {
    fetch('/channels', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: channelsName, textGoal: text }),
    }).then(() => {
      this.props.getChannels();
      this.setState({ name: '', text: '' });
    });
    this.handleClose();
  }

  render() {
    return (
      <div>
        <Modal
          size="tiny"
          open={this.state.modalOpen}
          onClose={this.handleClose}
          trigger={
            <Icon
              onClick={this.handleOpen}
              style={{ marginTop: '0.5em', marginLeft: '4em' }}
              name="plus circle"
            />
          }
          closeIcon
        >
          <Modal.Header>Créer une chaîne de discussion</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form
                onSubmit={() =>
                  this.addChannels(this.state.name, this.state.text)
                }
              >
                <Form.Field>
                  <label>Nom de la chaîne</label>
                  <input
                    className="form-control"
                    value={this.state.name}
                    onChange={this.handleName}
                  />
                </Form.Field>
                <Form.Field>
                  <label>But de la chaîne</label>
                  <input value={this.state.text} onChange={this.handleText} />
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
      </div>
    );
  }
}

export default AddModal;
