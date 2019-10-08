import React from 'react';
import { Input } from 'semantic-ui-react';

import { SendMessageWrapper } from './styles/SendMessage';

class SendMessage extends React.Component {
  state = {
    channelId: this.props.channelId,
    text: '',
    userId: 1,
  };

  onSubmit = async event => {
    event.preventDefault();
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
        <form onSubmit={onSubmit}>
          <Input
            name="text"
            onChange={onChange}
            value={text}
            placeholder="Send message"
            type="text"
            fluid
          />
        </form>
      </SendMessageWrapper>
    );
  }
}

export default SendMessage;
