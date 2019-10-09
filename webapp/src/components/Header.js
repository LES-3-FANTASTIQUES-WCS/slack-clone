import React, { Component } from 'react';
import SearchBar from '../components/Header/SearchBar';
import { Segment, Grid, Header } from 'semantic-ui-react';
import ToggleBtn from '../components/Header/ToggleBtn';
import { HeaderWrapper, ChannelStyle } from '../components/styles/Header';
import { LogUser } from './Header/LogUser';

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <HeaderWrapper>
        <Segment style={{ margin: '0rem ' }}>
          <Grid columns="equal">
            <ToggleBtn />

            <Grid.Column>
              <ChannelStyle>
                <Header textAlign="center">#{this.state.channelStyle}</Header>
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
  }
}

export default MainHeader;
