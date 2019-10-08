import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MessageList from './MessageList';
import { AppWrapper, LinkToChannel, ChannelList } from './App.styled';

class App extends React.Component {
  state = {
    isLoading: true,
    channels: [],
  };

  async componentDidMount() {
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
        <ChannelList>
          {this.state.channels.map(channel => (
            <li key={channel.id}>
              <LinkToChannel to={`/channels/${channel.id}/messages`}>
                {channel.name}
              </LinkToChannel>
            </li>
          ))}
        </ChannelList>
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
