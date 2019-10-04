import React from 'react';
import { Link } from 'react-router-dom';
import { ChannelList, ChannelListItem } from './App.styled';

class App extends React.Component {
  state = {
    isLoading: true,
    channels: [],
  };

  async componentDidMount() {
    const response = await fetch('/channels');
    const { channels } = await response.json();

    // same as:
    // const channels = (await response.json()).channels;

    this.setState({ channels, isLoading: false });
  }

  // using promises:

  // componentDidMount() {
  //   fetch('/channels')
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(({ channels }) => {
  //       this.setState({ channels, isLoading: false });
  //     });
  // }

  render() {
    if (this.state.isLoading) {
      return <div>Loading…</div>;
    }
    return (
      <ChannelList>
        {this.state.channels.map(channel => (
          <ChannelListItem key={channel.id}>{channel.name}</ChannelListItem>
        ))}
      </ChannelList>
    );
  }
}

export default App;
