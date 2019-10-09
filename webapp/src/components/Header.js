import React, { Component } from 'react';
import SearchBar from '../components/Header/SearchBar';
import {
  Segment,
  Grid,
  Header,
  Responsive,
  Button,
  Image,
} from 'semantic-ui-react';
import { HeaderWrapper, ChannelStyle } from '../components/styles/Header';
import { LogUser } from './Header/LogUser';
import Logo from '../assert/logo.svg';
import { ToggleBtnStyle } from './styles/Header';

class MainHeader extends Component {
  render() {
    return (
      <HeaderWrapper>
        <Segment style={{ margin: '0rem ' }}>
          <Grid columns="equal">
            <ToggleBtnStyle>
              <Responsive as={Header} maxWidth={767}>
                <Button onClick={this.props.toggleSidebar}>
                Menu
                </Button>
              </Responsive>
              <Responsive as={Header} minWidth={768}>
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image size="mini" src={Logo} />
                </a>
              </Responsive>
            </ToggleBtnStyle>

            <Grid.Column>
              <ChannelStyle>
                <Header textAlign="center">#{this.props.channelStyle}</Header>
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
