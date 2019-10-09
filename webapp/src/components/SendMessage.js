import React from 'react';
import { Input, Form } from 'semantic-ui-react';

import { SendMessageWrapper } from './styles/SendMessage';

class SendMessage extends React.Component {
  state = {
    text: '',
    userId: 1,
  };

  // For now, every new message is linked to first user id (userId = 1)
  // TODO: on create, assign message to a user or define it as an anonymous message
  submit = async () => {
    await fetch(`/api/channels/${this.props.channelId}/messages`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        channelId: this.props.channelId,
        text: this.state.text,
        userId: this.state.userId,
      }),
    });

    this.props.fetchMessages();

    this.setState({
      text: '',
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  render() {
    const { text } = this.state;
    const { onChange, submit } = this;

    return (
      <SendMessageWrapper>
        <Form onSubmit={submit}>
          <Form.Field>
            <Input
              name="text"
              onChange={onChange}
              value={text}
              placeholder="Send message"
              type="text"
              fluid
            />
          </Form.Field>
        </Form>
      </SendMessageWrapper>
    );
  }
}

export default SendMessage;
