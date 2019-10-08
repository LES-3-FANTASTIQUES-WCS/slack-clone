import React from 'react';

import MessageList from '../MessageList';
import SendMessage from '../SendMessage';

class MessagesView extends React.Component {
  state = {
    channelId: this.props.channelId,
    isLoading: true,
    messages: [],
    shouldRefetchMessages: false,
  };

  fetchMessages = async () => {
    this.setState({
      shouldRefetchMessages: false,
    });

    const response = await fetch(
      `/api/channels/${this.state.channelId}/messages`
    );

    const { messages } = await response.json();

    this.setState({
      isLoading: false,
      messages,
    });
  };

  componentDidMount() {
    this.fetchMessages();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // will need to refetch whenever React Router passes another channel id without unmounting component
    if (nextProps.channelId !== prevState.channelId) {
      // equivalent to this.setState(…)
      return { channelId: nextProps.channelId, shouldRefetchMessages: true };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.state.shouldRefetchMessages) {
      this.fetchMessages();
    }
  }

  render() {
    return (
      <>
        <MessageList
          isLoading={this.state.isLoading}
          messages={this.state.messages}
        />
        <SendMessage
          channelId={this.state.channelId}
          fetchMessages={this.fetchMessages}
        />
      </>
    );
  }
}

export default MessagesView;
