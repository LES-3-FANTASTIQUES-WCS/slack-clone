import React, { useState, useEffect } from 'react';

const useMessageList = channelId => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const _fetchMessages = async () => {
      const response = await fetch(`/api/channels/${channelId}/messages`);
      const { messages } = await response.json();
      setMessages(messages);
      setIsLoading(false);
    };
    _fetchMessages();
  }, [channelId]);

  return [isLoading, messages];
};

const MessageList = ({ channelId }) => {
  const [isLoading, messages] = useMessageList(channelId);

  if (isLoading) {
    return <div>Loading…</div>;
  }
  return (
    <ol>
      {messages.map(message => (
        <li key={message.id}>{message.content}</li>
      ))}
    </ol>
  );
};

export default MessageList;
