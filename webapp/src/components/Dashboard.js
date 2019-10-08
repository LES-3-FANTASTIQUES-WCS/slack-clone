import React from 'react';
import { Route } from 'react-router-dom';

import Channels from './Channels';
import Header from './Header';
import MessagesView from './containers/MessagesView';
import AppLayout from './styles/AppLayout';

export default () => (
  <AppLayout>
    <Channels
      teamName="Team name"
      userName="Username"
      channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
      users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
    />
    <Header channelName="general" />
    <Route
      path="/channels/:channelId/messages"
      render={props => (
        <MessagesView channelId={props.match.params.channelId} />
      )}
    />
  </AppLayout>
);
