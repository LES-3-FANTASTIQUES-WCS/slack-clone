import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { isWidescreen } from './utils';
import MessageList from './components/MessageList/MessageList';
import ChannelList from './components/ChannelList/ChannelList';
import ToggleChannelList from './components/ToggleChannelList/ToggleChannelList';
import { AppWrapper } from './App.styled';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const [isWideScreen, setIsWideScreen] = useState(isWidescreen());

  useEffect(() => {
    window.addEventListener('resize', setScreenWidth);
    const _fetchChannels = async () => {
      const response = await fetch('/api/channels');
      const { channels } = await response.json();
      setChannels(channels);
      setIsLoading(false);
    };
    _fetchChannels();

    return () => {
      window.removeEventListener('resize');
    };
  }, []);

  const setScreenWidth = () => {
    setIsWideScreen(isWidescreen());
  };

  if (isLoading) {
    return <div>Loading…</div>;
  }
  return (
    <AppWrapper>
      {isWideScreen ? (
        <ChannelList channels={channels} isOpen={true} />
      ) : (
        <ToggleChannelList channels={channels} />
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
};

export default App;
