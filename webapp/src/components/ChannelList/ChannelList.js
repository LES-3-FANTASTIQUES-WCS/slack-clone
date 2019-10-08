import React from 'react';

import {
  ChannelList as StyledChannelList,
  LinkToChannel,
} from './ChannelList.styled';

const ChannelList = props => (
  <StyledChannelList>
    {props.channels.map(channel => (
      <li key={channel.id}>
        <LinkToChannel to={`/channels/${channel.id}/messages`}>
          {channel.name}
        </LinkToChannel>
      </li>
    ))}
  </StyledChannelList>
);

export default ChannelList;
