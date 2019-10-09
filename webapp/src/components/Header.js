import React from 'react';
import { Header } from 'semantic-ui-react';

import { HeaderWrapper } from './styles/Header';

export default ({ channelName }) => (
  <HeaderWrapper>
    <Header textAlign="center">#{channelName}</Header>
  </HeaderWrapper>
);
