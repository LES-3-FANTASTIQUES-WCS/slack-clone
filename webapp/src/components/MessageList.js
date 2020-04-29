/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React from 'react';
import { Comment, Button, Divider } from 'semantic-ui-react';

import { MessageWrapper } from './styles/MessagesList';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatDate(date) {
    const today = new Date();
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    if (today.toDateString() === new Date(date).toDateString()) {
      return "Ajourd'hui";
    } else if (
      new Date(today.setDate(today.getDate() - 1)).toDateString() ===
      new Date(date).toDateString()
    ) {
      return 'Hier';
    } else if (today.getUTCFullYear() > new Date(date).getUTCFullYear()) {
      return new Date(date).toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      });
    } else {
      return new Date(date).toLocaleDateString(undefined, options);
    }
  }

  render() {
    let id = 1;
    if (this.props.isLoading) {
      return <div>Loading…</div>;
    }
    return (
      <MessageWrapper>
        <Comment.Group>
          {this.props.endMessageList ? (
            <div>Vous êtes au bout de la liste de messages !</div>
          ) : (
            <Button onClick={() => this.props.loadMore()}>Load More</Button>
          )}
          {this.props.messages
            .map(dayWithMessages => (
              <div key={id++}>
                <Divider horizontal>
                  {this.formatDate(dayWithMessages.day)}
                </Divider>
                {dayWithMessages.messages.map(message => (
                  <Comment
                    style={{ width: '100% !important' }}
                    key={`${message.id}-message`}
                  >
                    <Comment.Avatar as="a" src="https://picsum.photos/200" />
                    <Comment.Content>
                      <Comment.Author as="a">{message.username}</Comment.Author>
                      <Comment.Metadata></Comment.Metadata>
                      <Comment.Text>{message.text}</Comment.Text>
                      <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                ))}
              </div>
            ))
            .reverse()}
        </Comment.Group>
      </MessageWrapper>
    );
  }
}

export default MessageList;
