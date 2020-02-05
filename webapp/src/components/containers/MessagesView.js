import React from 'react';

import MessageList from '../MessageList';
import SendMessage from '../SendMessage';
import contextCurrentUser from '../../context/ContextCurrentUser';

class MessagesView extends React.Component {
  state = {
    channelId: this.props.channelId,
    oldChannelId: '',
    isLoading: true,
    messages: [],
    shouldRefetchMessages: false,
    limit: 10,
    offset: 0,
  };

  static contextType = contextCurrentUser;
  fetchMessages = async () => {
    this.setState({
      shouldRefetchMessages: false,
    });

    const response = await fetch(
      `/api/channels/${this.state.channelId}/messages/${this.state.limit}/${this.state.offset}`
    );

    const { messages } = await response.json();

    if (
      this.state.offset === 0 &&
      this.context.channelActive !== this.state.oldChannelId
    ) {
      this.setState({
        messages,
        isLoading: false,
        oldChannelId: this.context.channelActive,
      });
    } else {
      const newValue = this.state.messages.concat(messages);
      this.setState({
        messages: newValue,
        isLoading: false,
        oldChannelId: this.context.channelActive,
      });
    }
  };

  loadMore = value => {
    this.setState({ offset: this.state.offset + value });
    console.log(this.state.offset);
    this.fetchMessages();
  };

  componentDidMount() {
    console.log(this.state.offset);
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
          loadMore={this.loadMore}
          isLoading={this.state.isLoading}
          messages={this.state.messages}
        />
        <SendMessage
          channelId={this.state.channelId}
          // fetchMessages={this.fetchMessages}
        />
      </>
    );
  }
}

export default MessagesView;
