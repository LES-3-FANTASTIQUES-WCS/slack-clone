import React from 'react';
import { Input } from 'semantic-ui-react';

import { SendMessageWrapper } from './styles/SendMessage';

class SendMessage extends React.Component {
  render() {
    return (
      <SendMessageWrapper>
        <Input fluid placeholder="Send message" />
      </SendMessageWrapper>
    );
  }
}

export default SendMessage;
