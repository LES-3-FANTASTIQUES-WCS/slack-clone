import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import MessageList from './MessageList';
import { ChannelList, ChannelListItem } from './App.styled';

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
      <>
        <ChannelList>
          {this.state.channels.map(channel => (
            <ChannelListItem key={channel.id}>
              <Link to={`/channels/${channel.id}/messages`}>
                {channel.name}
              </Link>
            </ChannelListItem>
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
      </>
    );
  }
}

export default App;
