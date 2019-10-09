import React from 'react';
import { Route } from 'react-router-dom';

import Channels from './Channels/Channels';
import Header from './Header';
import MessagesView from './containers/MessagesView';
import AppLayout from './styles/AppLayout';

export default () => (
  <AppLayout>
    <Channels />
    <Header channelName="general" />
    <Route
      path="/channels/:channelId/messages"
      render={props => (
        <MessagesView channelId={props.match.params.channelId} />
      )}
    />
  </AppLayout>
);
