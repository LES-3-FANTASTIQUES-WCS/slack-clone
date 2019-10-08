import React from 'react';
import { Input } from 'semantic-ui-react';

import { SendMessageWrapper } from './styles/SendMessage';

export default ({ channelName }) => (
  <SendMessageWrapper>
    <Input fluid placeholder={`Message #${channelName}`} />
  </SendMessageWrapper>
);
