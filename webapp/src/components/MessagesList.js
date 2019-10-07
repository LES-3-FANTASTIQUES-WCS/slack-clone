import React from 'react';
import { Comment } from 'semantic-ui-react';

import { MessageWrapper } from './styles/MessagesList';

export default ({ messages }) => (
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
