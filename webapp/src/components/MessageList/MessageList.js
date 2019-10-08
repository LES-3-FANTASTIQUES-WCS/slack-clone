import React from 'react';

class MessageList extends React.Component {
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
      `/api/channels/${this.props.channelId}/messages`
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
    if (this.state.isLoading) {
      return <div>Loading…</div>;
    }
    return (
      <ol>
        {this.state.messages.map(message => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ol>
    );
  }
}

export default MessageList;
