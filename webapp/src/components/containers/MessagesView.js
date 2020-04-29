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
    nextPage: 1,
    endMessageList: false,
  };

  static contextType = contextCurrentUser;

  getDay = date => {
    return date.substring(0, 10);
  };

  getDaysWithMessages = messages => {
    const dayWithMassages = [];
    messages.forEach(message => {
      const messageDay = this.getDay(message.created_at);
      const dayWithMessages = dayWithMassages.find(
        item => item.day === messageDay
      );
      if (!dayWithMessages) {
        dayWithMassages.push({
          day: messageDay,
          messages: [message],
        });
      } else {
        dayWithMessages.messages.push(message);
      }
    });
    return dayWithMassages;
  };

  fetchMessages = async () => {
    this.setState({
      shouldRefetchMessages: false,
    });

    const response = await fetch(
      `/api/channels/${this.state.channelId}/messages?page=${this.state.nextPage}`
    );

    const { messages, nextPage } = await response.json();

    if (this.state.oldChannelId === '') {
      this.setState({ oldChannelId: this.state.channelActive });
    }
    if (this.context.channelActive !== this.state.channelId) {
      this.setState({
        messages: this.getDaysWithMessages(messages.messages),
        isLoading: false,
        oldChannelId: JSON.stringify(this.context.channelActive),
      });
    } else {
      const newValue = this.state.messages.concat(messages);
      this.setState({
        messages: this.getDaysWithMessages(newValue),
        isLoading: false,
        oldChannelId: JSON.stringify(this.context.channelActive),
        nextPage,
      });
    }
    // this.setState({ endMessageList: messages.messages.length === 0 ? true : false });
  };

  fetchPreviousMessages = () => {
    this.fetchMessages();
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
    if (this.state.shouldRefetchMessages && this._isMounted) {
      // this.setState({ shouldRefetchMessages: false });
      this.fetchMessages();
    }
  }

  render() {
    return (
      <>
        <MessageList
          endMessageList={this.state.endMessageList}
          loadMore={this.fetchPreviousMessages}
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
