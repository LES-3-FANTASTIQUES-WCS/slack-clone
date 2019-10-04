import React from 'react';

class MessageList extends React.Component {
  state = {
    channelId: this.props.channelId,
    isLoading: true,
    messages: [],
  };

  static async getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps.channelId, prevState);
    if (nextProps.channelId !== prevState.channelId) {
      const response = await fetch(
        `/api/channels/${nextProps.channelId}/messages`
      );
      const { messages } = await response.json();

      return {
        channelId: nextProps.channelId,
        isLoading: false,
        messages,
      };
    }
    return null;
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages = async () => {
    const response = await fetch(
      `/api/channels/${this.props.channelId}/messages`
    );
    const { messages } = await response.json();

    this.setState({ messages, isLoading: false });
  };

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
