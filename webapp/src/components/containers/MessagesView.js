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
    limit: 5,
    offset: 0,
    endMessageList: false,
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

    if (this.state.oldChannelId === '') {
      this.setState({ oldChannelId: this.state.channelActive });
    }
    if (
      this.state.offset === 0 &&
      this.context.channelActive !== this.state.channelId
    ) {
      this.setState({
        messages,
        isLoading: false,
        oldChannelId: JSON.stringify(this.context.channelActive),
      });
    } else {
      const newValue = this.state.messages.concat(messages);
      this.setState({
        messages: newValue,
        isLoading: false,
        oldChannelId: JSON.stringify(this.context.channelActive),
      });
    }
    if (messages.length === 0) {
      console.log(0);
      this.setState({ endMessageList: true });
    } else {
      console.log(1);
      this.setState({ endMessageList: false });
    }
  };

  loadMore = value => {
    this.setState({
      offset: this.state.offset + value,
      shouldRefetchMessages: true,
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
          endMessageList={this.state.endMessageList}
          loadMore={this.loadMore}
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
