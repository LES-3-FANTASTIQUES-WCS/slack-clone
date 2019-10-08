import React from 'react';
import { Input, Form } from 'semantic-ui-react';

import { SendMessageWrapper } from './styles/SendMessage';

class SendMessage extends React.Component {
  state = {
    channelId: this.props.channelId,
    text: '',
    userId: 1,
  };

  onSubmit = async () => {
    const response = this.state;

    console.log(response);
  };

  onChange = e => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  render() {
    const { text } = this.state;
    const { onChange, onSubmit } = this;

    return (
      <SendMessageWrapper>
        <Form onSubmit={onSubmit}>
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
