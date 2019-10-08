import React from 'react';

import Channels from './Channels/Channels';
import { TeamWrapper } from './styles/Teams';
//import Header from './Header';
import Messages from './MessagesList';
import SendMessage from './SendMessage';
import AppLayout from './styles/AppLayout';

export default () => (
  <AppLayout>
    <TeamWrapper>Teams</TeamWrapper>
    <Channels />
    {/* <Header channelName="general" />> */}
    <Messages
      messages={[
        { id: 1, username: 'Helder', text: 'Hello Valentine' },
        { id: 2, username: 'Valentine', text: 'Hey Helder' },
      ]}
    />
    <SendMessage channelName="general" />
  </AppLayout>
);
