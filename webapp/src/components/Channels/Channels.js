import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sidebar, Grid, Icon } from 'semantic-ui-react';

import AddModal from '../modal/Modal';
import {
  HeaderChannelList,
  ChannelWrapper,
  SidebarTitle,
  ButtonClose,
} from '../styles/Channels';
import SearchBar from '../../components/Header/SearchBar';
import contextCurrentUser from '../../context/ContextCurrentUser';

class Channels extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      isMobileScreen: false,
      showMore: false,
      activeItem: true,
    };
  }

  selectChannelActive = id => {
    this.setState({ activeItem: id });
  };

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      window.addEventListener('resize', this.getMobileScreen.bind(this));
      this.getMobileScreen();

      this.getChannels();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
  static contextType = contextCurrentUser;

  sendChannelActive = (channelName, id) => {
    this.context.setChannelActive(id);
    this.props.getChannelActive(channelName);
    this.state.isMobileScreen && this.props.toggleSidebar();
    this.setState({ activeItem: !this.state.activeItem });
    this.selectChannelActive(id);
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
                  to={`/dashboard/channels/${channels.id}/messages`}
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
                    to={`/dashboard/channels/${channels.id}/messages`}
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
