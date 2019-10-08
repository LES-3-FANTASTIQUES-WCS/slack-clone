import React from 'react';

import Channels from './Channels';
import { TeamWrapper } from './styles/Teams';
import Header from './Header';
import Messages from './MessagesList';
import SendMessage from './SendMessage';
import AppLayout from './styles/AppLayout';

export default () => (
  <AppLayout>
    <TeamWrapper>Teams</TeamWrapper>
    <Channels
      teamName="Team name"
      userName="Username"
      channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
      users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
    />
    <Header channelName="general" />>
    <Messages
      messages={[
        { id: 1, username: 'Helder', text: 'Hello Valentine' },
        { id: 2, username: 'Valentine', text: 'Hey Helder' },
      ]}
    />
    <SendMessage channelName="general" />
  </AppLayout>
);
