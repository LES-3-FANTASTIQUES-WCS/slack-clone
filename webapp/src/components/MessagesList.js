import React from 'react';
import { Comment } from 'semantic-ui-react';

import { MessageWrapper } from './styles/MessagesList';

class MessagesList extends React.Component {
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
      <MessageWrapper>
        <Comment.Group>
          {messages.map(message => (
            <Comment key={`${message.id}-message`}>
              <Comment.Avatar as="a" src="https://picsum.photos/200" />
              <Comment.Content>
                <Comment.Author as="a">{message.username}</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>{message.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </MessageWrapper>
    );
  }
}
