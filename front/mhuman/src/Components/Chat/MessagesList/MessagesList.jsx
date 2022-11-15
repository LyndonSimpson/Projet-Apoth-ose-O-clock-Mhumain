import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './messagesListStyles.scss';
import Message from '../Message/Message';
import MessageContext from '../../../contexts/MessageContext';

function MessagesList() {
  const { messages } = useContext(MessageContext);
  const containerRef = useRef(null);

  useEffect(() => {
    // des que la liste des messages changent on va modifier le scroll de notre liste
    containerRef.current?.scrollTo(0, containerRef.current?.scrollHeight);
    // on lui demande de scroll de 0 en X, et de sa hauteur en Y
  }, [messages]);

  return (
    <div className="messages" ref={containerRef}>
      {messages.map(({ author, message }, index) => (
        <Message
          key={index}
          author={author}
          message={message}
          isMine={author === 'Me'}
        />
      ))}
    </div>
  );
}
MessagesList.propTypes = {};

MessagesList.defaultProps = {};

export default React.memo(MessagesList);
