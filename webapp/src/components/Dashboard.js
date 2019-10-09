import React from 'react';
import { Route } from 'react-router-dom';

import Channels from './Channels/Channels';
import Header from './Header';
import MessagesView from './containers/MessagesView';
import AppLayout from './styles/AppLayout';

class Dashboard extends React.Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    //call function to hide sidebar
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
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
    console.log(345, this.state.isOpen);
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <AppLayout>
        <Channels isOpen={this.state.isOpen} />
        <Header channelName="general" toggleSidebar={this.toggleSidebar} />
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
