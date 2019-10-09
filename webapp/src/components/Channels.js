import React from 'react';

import { ChannelWrapper } from './styles/Channels';

const renderChannel = ({ id, name }) => <li key={`channel-${id}`}>{name}</li>;

const renderUser = ({ id, name }) => <li key={`user-${id}`}>{name}</li>;

export default ({ teamName, username, channels, users }) => (
  <ChannelWrapper>
    <div>
      {teamName}
      {username}
    </div>
    <div>
      <ul>
        <li>Channels</li>
        {channels.map(renderChannel)}
      </ul>
    </div>
    <div>
      <ul>
        <li>Direct Messages</li>
        {users.map(renderUser)}
      </ul>
    </div>
  </ChannelWrapper>
);
