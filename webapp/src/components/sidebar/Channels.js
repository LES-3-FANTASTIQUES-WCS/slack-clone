import React from 'react';
import { Menu, Segment, Sidebar, Grid } from 'semantic-ui-react';

import AddModal from '../modal/Modal';

class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      isVisible: true,
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
    const response = await fetch('/channels');
    const { channels } = await response.json();
    this.setState({ channels });
  };

  //hide sidebar
  resize() {
    if (window.innerWidth <= 560) {
      this.setState({ isVisible: false });
    } else {
      this.setState({ isVisible: true });
    }
  }

  render() {
    return (
      <div
        style={{ height: '100vh', display: 'flex', flexFlow: 'column nowrap' }}
      >
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            vertical
            visible={this.state.isVisible}
          >
            <Menu.Item>
              <Grid columns="two" divided>
                <Grid.Row>
                  <Grid.Column>
                    <h3 style={{ textAlign: 'left', marginBottom: '1.5em' }}>
                      Channels
                    </h3>
                  </Grid.Column>
                  <Grid.Column>
                    <AddModal getChannels={this.getChannels} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Menu.Item>
            <div>
              {this.state.channels.map(channels => (
                <Menu.Item key={channels.id}># {channels.name}</Menu.Item>
              ))}
            </div>
          </Sidebar>
        </Sidebar.Pushable>
      </div>
    );
  }
}
export default Channels;
