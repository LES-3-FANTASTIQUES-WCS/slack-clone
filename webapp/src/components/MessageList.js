import React from 'react';
import { Comment, Button } from 'semantic-ui-react';

import { MessageWrapper } from './styles/MessagesList';

// For now, every new message is linked to first user username (username = Helder)
//  every new message is uses a random profile picture (http://picsum.photos)
// TODO: on create, assign message to a user or define it as an anonymous message
// TODO: use profile picture choosen by the user or define one as default
class MessageList extends React.Component {
  render() {
    if (this.props.isLoading) {
      return <div>Loading…</div>;
    }
    return (
      <MessageWrapper>
        <Comment.Group>
          <Button onClick={() => console.log('load more')}>Load More</Button>
          {this.props.messages.map(message => (
            <Comment key={`${message.id}-message`}>
              <Comment.Avatar as="a" src="https://picsum.photos/200" />
              <Comment.Content>
                <Comment.Author as="a">{message.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{message.created_at}</div>
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

export default MessageList;
