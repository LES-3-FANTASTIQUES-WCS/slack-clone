import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { isWidescreen } from './utils';
import MessageList from './components/MessageList/MessageList';
import ChannelList from './components/ChannelList/ChannelList';
import ToggleChannelList from './components/ToggleChannelList/ToggleChannelList';
import { AppWrapper } from './App.styled';

class App extends React.Component {
  state = {
    isLoading: true,
    channels: [],
    isWidescreen: isWidescreen(),
  };

  setScreenWidth = () => {
    this.setState({ isWidescreen: isWidescreen() });
  };

  async componentDidMount() {
    window.addEventListener('resize', this.setScreenWidth);
    const response = await fetch('/api/channels');
    const { channels } = await response.json();
    this.setState({ channels, isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading…</div>;
    }
    return (
      <AppWrapper>
        {this.state.isWidescreen ? (
          <ChannelList channels={this.state.channels} isOpen={true} />
        ) : (
          <ToggleChannelList channels={this.state.channels} />
        )}
        <Switch>
          <Route
            path="/channels/:channelId/messages"
            render={props => (
              <MessageList channelId={props.match.params.channelId} />
            )}
          />
        </Switch>
      </AppWrapper>
    );
  }
}

export default App;
