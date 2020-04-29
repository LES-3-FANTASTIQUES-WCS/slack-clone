import React from 'react';
import { Route } from 'react-router-dom';

import { DASHBOARD_PATH } from '../constants';
import Channels from './Channels/Channels';
import Header from './Header';
import MessagesView from './containers/MessagesView';
import AppLayout from './styles/AppLayout';

class Dashboard extends React.Component {
  _isMounted = false;
  state = {
    isOpen: true,
    channelActive: 'general',
  };

  componentDidMount() {
    this._isMounted = true;
    //call function to hide sidebar
    window.addEventListener('resize', this.resize.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
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
          channelName={this.state.channelActive}
          toggleSidebar={this.toggleSidebar}
          channelActive={this.state.channelActive}
          currentUser={this.props.currentUser}
        />
        <Route
          path={`${DASHBOARD_PATH}/channels/:channelId/messages`}
          render={props => (
            <MessagesView channelId={props.match.params.channelId} />
          )}
        />
      </AppLayout>
    );
  }
}

export default Dashboard;
