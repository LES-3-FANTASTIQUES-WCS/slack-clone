import React from 'react';

import {
  ChannelList as StyledChannelList,
  ChannelListWrapper,
  CloseButton,
  LinkToChannel,
} from './ChannelList.styled';

const ChannelList = props => {
  console.log('ChannelList');
  return (
    <ChannelListWrapper isOpen={props.isOpen}>
      <CloseButton>x</CloseButton>
      <StyledChannelList>
        {props.channels.map(channel => (
          <li key={channel.id}>
            <LinkToChannel
              to={`/channels/${channel.id}/messages`}
              onClick={props.closeChannelList}
            >
              {channel.name}
            </LinkToChannel>
          </li>
        ))}
      </StyledChannelList>
    </ChannelListWrapper>
  );
};

export default ChannelList;
