import React from 'react';
import { Menu, Sidebar, Grid, Icon } from 'semantic-ui-react';

import AddModal from '../modal/Modal';
import {
  HeaderChannelList,
  ItemChannel,
  ChannelWrapper,
  SidebarTitle,
} from '../styles/Channels';
import SearchBar from '../../components/Header/SearchBar';

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      isMobileScreen: false,
      showMore: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.getMobileScreen.bind(this));
    this.getMobileScreen();

    this.getChannels();
  }

  //get channels from server
  getChannels = async () => {
    const response = await fetch('/api/channels');
    const { channels } = await response.json();
    this.setState({ channels });
  };

  getMobileScreen() {
    if (window.innerWidth < 768) {
      this.setState({ isMobileScreen: true });
    } else {
      this.setState({ isMobileScreen: false });
    }
  }

  showMore = () => this.setState({ showMore: !this.state.showMore });

  sendChannelActive = channelName => {
    this.props.getChannelActive(channelName);
    this.state.isMobileScreen && this.props.toggleSidebar();
  };

  render() {
    const isShow = this.state.showMore;

    return (
      this.props.isOpen && (
        <ChannelWrapper>
          <Sidebar
            as={Menu}
            animation="push"
            icon="labeled"
            inverted
            vertical
            visible={this.props.isOpen}
          >
            {this.state.isMobileScreen && (
              <button
                style={{
                  backgroundColor: '#1B1C1D',
                  border: 'none',
                  marginLeft: '16em',
                  marginTop: '0.5em',
                }}
              >
                <Icon
                  name="close"
                  onClick={this.props.toggleSidebar}
                  style={{ fontSize: '1.5em' }}
                  inverted
                />
              </button>
            )}

            <HeaderChannelList>
              <Menu.Item>
                <Grid columns="two" divided>
                  <Grid.Row>
                    <Grid.Column>
                      <SidebarTitle>Channels</SidebarTitle>
                    </Grid.Column>
                    <Grid.Column>
                      <AddModal getChannels={this.getChannels} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Menu.Item>
            </HeaderChannelList>

            <div style={{ zIndex: 0 }}>
              {this.state.channels.slice(0, 5).map(channels =>
                this.state.isMobileScreen ? (
                  <ItemChannel
                    onClick={() => this.sendChannelActive(channels.name)}
                    style={{ cursor: 'pointer' }}
                    key={channels.id}
                  >
                    # {channels.name}
                  </ItemChannel>
                ) : (
                  <ItemChannel
                    onClick={() => this.sendChannelActive(channels.name)}
                    style={{ cursor: 'pointer' }}
                    key={channels.id}
                  >
                    # {channels.name}
                  </ItemChannel>
                )
              )}
              {isShow &&
                this.state.channels.slice(5).map(channels =>
                  this.state.isMobileScreen ? (
                    <ItemChannel
                      onClick={() => this.sendChannelActive(channels.name)}
                      style={{ cursor: 'pointer' }}
                      key={channels.id}
                    >
                      # {channels.name}
                    </ItemChannel>
                  ) : (
                    <ItemChannel
                      onClick={() => this.sendChannelActive(channels.name)}
                      style={{ cursor: 'pointer' }}
                      key={channels.id}
                    >
                      # {channels.name}
                    </ItemChannel>
                  )
                )}

              {this.state.channels.length > 5 && (
                <Menu.Item
                  style={{ fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={this.showMore}
                  active
                >
                  {isShow ? 'Voir moins' : 'Voir plus'}
                </Menu.Item>
              )}
            </div>
            {this.state.isMobileScreen && (
              <SearchBar style={{ marginTop: '5em' }} />
            )}
          </Sidebar>
        </ChannelWrapper>
      )
    );
  }
}
export default Channels;
