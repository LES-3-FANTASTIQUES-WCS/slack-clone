import React from 'react';
import { Route } from 'react-router-dom';

import Channels from './Channels/Channels';
import Header from './Header';
import MessagesView from './containers/MessagesView';
import AppLayout from './styles/AppLayout';

class Dashboard extends React.Component {
  state = {
    isOpen: true,
    channelActive: '',
  };

  componentDidMount() {
    //call function to hide sidebar
    window.addEventListener('resize', this.resize.bind(this));
  }

  //hide sidebar
  resize() {
    if (window.innerWidth < 768) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  }

  toggleSidebar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  getChannelActive = channelName => {
    this.setState({ channelActive: channelName });
  };

  render() {
    return (
      <AppLayout>
        <Channels
          isOpen={this.state.isOpen}
          toggleSidebar={this.toggleSidebar}
          getChannelActive={this.getChannelActive}
        />
        <Header
          channelName="general"
          toggleSidebar={this.toggleSidebar}
          channelActive={this.state.channelActive}
        />
        <Route
          path="/channels/:channelId/messages"
          render={props => (
            <MessagesView channelId={props.match.params.channelId} />
          )}
        />
      </AppLayout>
    );
  }
}

export default Dashboard;
