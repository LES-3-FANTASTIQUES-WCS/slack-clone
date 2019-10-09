import React from 'react';
import SearchBar from '../components/Header/SearchBar';
import { Segment, Grid, Header } from 'semantic-ui-react';
import ToggleBtn from '../components/Header/ToggleBtn';
import { HeaderWrapper, ChannelStyle } from '../components/styles/Header';
import { LogUser } from './Header/LogUser';

const TheHeader = ({ channelName }) => {
  return (
    <HeaderWrapper>
      <Segment style={{ margin: '0rem ' }}>
        <Grid columns="equal">
          <ToggleBtn />

          <Grid.Column>
            <ChannelStyle>
              <Header textAlign="center">#{channelName}</Header>
            </ChannelStyle>
          </Grid.Column>

          <Grid.Column>
            <SearchBar />
          </Grid.Column>

          <LogUser />
        </Grid>
      </Segment>
    </HeaderWrapper>
  );
};

export default TheHeader;
