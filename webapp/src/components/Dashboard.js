import React from 'react';
import { Route } from 'react-router-dom';

import Channels from './Channels/Channels';
import { TeamWrapper } from './styles/Teams';
import Header from './Header';
import MessageList from './MessageList';
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
    <Header channelName="general" />
    <Route
      path="/channels/:channelId/messages"
      render={props => <MessageList channelId={props.match.params.channelId} />}
    />
    <SendMessage />
  </AppLayout>
);
