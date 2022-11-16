import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const messagesData = [];

const MessageContext = React.createContext({
  messages: [],
  sendMessage: () => {},
});

export default MessageContext;

export function MessageContextProvider({
  children,
}) {
  const [messages, setMessages] = useState(messagesData);

  const sendMessage = (obj) => {
    // on passe une fonction à setMessages, cette fonction prends l'ancienne valeur du state message, et retourne la nouvelle valeur
    // cela permet de rendre sendMessage agnostique/isolé/indépendant de variables changeante (messages étant une variable changeante, mais setMessages)
    setMessages((oldMessages) => [
      ...oldMessages,
      {
        author: obj.author,
        message: obj.messageText,
      },
    ]);
  };

  const contextValue = useMemo(() => ({
    // ici on memoize contextvalue pour ne pas le re-calculer à chaque render, mais que quand messages change
    messages,
    sendMessage,
  }), [messages]);

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
}

MessageContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
