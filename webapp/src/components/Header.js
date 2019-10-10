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
  state = {
    isMobileScreen: false,
  };
  componentDidMount() {
    window.addEventListener('resize', this.getMobileScreen.bind(this));
    this.getMobileScreen();
  }
  getMobileScreen() {
    if (window.innerWidth < 768) {
      this.setState({ isMobileScreen: true });
    } else {
      this.setState({ isMobileScreen: false });
    }
  }

  render() {
    return (
      <HeaderWrapper>
        <Segment style={{ margin: '0rem ' }}>
          <Grid columns="equal">
            <ToggleBtnStyle>
              <Responsive as={Header} maxWidth={767}>
                <Button onClick={this.props.toggleSidebar}>Menu</Button>
              </Responsive>
              <Responsive as={Header} minWidth={768}>
                <a href="/" target="_blank" rel="noreferrer">
                  <Image size="mini" src={Logo} />
                </a>
              </Responsive>
            </ToggleBtnStyle>
            <Grid.Column>
              <ChannelStyle>
                <Header textAlign="center">#{this.props.channelActive}</Header>
              </ChannelStyle>
            </Grid.Column>
            {!this.state.isMobileScreen && (
              <Grid.Column>
                <SearchBar />
              </Grid.Column>
            )}
            <LogUser />
          </Grid>
        </Segment>
      </HeaderWrapper>
    );
  }
}

export default MainHeader;
