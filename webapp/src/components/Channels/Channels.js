import React from 'react';
import { Menu, Sidebar, Grid } from 'semantic-ui-react';

import AddModal from '../modal/Modal';
import {
  HeaderChannelList,
  ItemChannel,
  ChannelWrapper,
} from '../styles/Channels';

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      isVisible: true,
      showMore: false,
    };
  }

  componentDidMount() {
    //call function to hide sidebar
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    this.getChannels();
  }

  //get channels from server
  getChannels = async () => {
    const response = await fetch('/api/channels');
    const { channels } = await response.json();
    this.setState({ channels });
  };

  //hide sidebar
  resize() {
    if (window.innerWidth < 768) {
      this.setState({ isVisible: false });
    } else {
      this.setState({ isVisible: true });
    }
  }

  showMore() {
    this.setState({ showMore: !this.state.showMore });
  }

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
            <HeaderChannelList>
              <Menu.Item>
                <Grid columns="two" divided>
                  <Grid.Row>
                    <Grid.Column>
                      <h3
                        style={{
                          textAlign: 'left',
                          marginBottom: '1.5em',
                          marginLeft: '1em',
                        }}
                      >
                        Channels
                      </h3>
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
                <ItemChannel
                  style={{ cursor: 'pointer' }}
                  key={channels.id}
                  to={`/channels/${channels.id}/messages`}
                >
                  # {channels.name}
                </ItemChannel>
              ))}
              {isShow &&
                this.state.channels.slice(5).map(channels => (
                  <ItemChannel
                    style={{ cursor: 'pointer' }}
                    key={channels.id}
                    to={`/channels/${channels.id}/messages`}
                  >
                    # {channels.name}
                  </ItemChannel>
                ))}

              {this.state.channels.length > 5 && (
                <Menu.Item
                  style={{ fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => this.showMore()}
                  active
                >
                  {isShow ? 'Voir moins' : 'Voir plus'}
                </Menu.Item>
              )}
            </div>
          </Sidebar>
        </ChannelWrapper>
      )
    );
  }
}
export default Channels;
