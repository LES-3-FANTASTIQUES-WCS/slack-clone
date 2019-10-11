import React from 'react';
import { Menu, Sidebar, Grid, Icon } from 'semantic-ui-react';

import AddModal from '../modal/Modal';
import {
  HeaderChannelList,
  ChannelWrapper,
  SidebarTitle,
  ButtonClose,
} from '../styles/Channels';
import SearchBar from '../../components/Header/SearchBar';
import { Link } from 'react-router-dom';

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      isMobileScreen: false,
      showMore: false,
      activeItem: '',
    };
  }
  
  selectChannelActive = id => {
    this.setState({ activeItem: id });
  };
  
  componentDidMount() {
    const urlId = window.location.href.split('/')[4];
    this.sendChannelActive('',urlId);
    this.getChannels();
    window.addEventListener('resize', this.getMobileScreen.bind(this));
    this.getMobileScreen();
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

  sendChannelActive = (channelName, id) => {
    this.props.getChannelActive(channelName);
    this.state.isMobileScreen && this.props.toggleSidebar();
    this.setState({ activeItem: id });
    this.selectChannelActive(id);
    console.log('activeitem', this.state.activeItem);
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
            style={{ overflowX: 'hidden' }}
          >
            {this.state.isMobileScreen && (
              <ButtonClose>
                <Icon
                  name="close"
                  onClick={this.props.toggleSidebar}
                  style={{ fontSize: '1.5em' }}
                  inverted
                />
              </ButtonClose>
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
              {this.state.channels.slice(0, 5).map(channels => (
                <Menu.Item
                  as={Link}
                  to={`/channels/${channels.id}/messages`}
                  active={this.state.activeItem === channels.id}
                  onClick={() =>
                    this.sendChannelActive(channels.name, channels.id)
                  }
                  key={channels.id}
                >
                  # {channels.name}
                </Menu.Item>
              ))}
              {isShow &&
                this.state.channels.slice(5).map(channels => (
                  <Menu.Item
                    as={Link}
                    to={`/channels/${channels.id}/messages`}
                    active={this.state.activeItem === channels.id}
                    onClick={() =>
                      this.sendChannelActive(channels.name, channels.id)
                    }
                    key={channels.id}
                  >
                    # {channels.name}
                  </Menu.Item>
                ))}

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
