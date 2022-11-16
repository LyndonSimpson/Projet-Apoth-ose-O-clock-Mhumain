import React from 'react';

import './chatStyles.scss';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MessageFormSend from './MessageFormSend/MessageFormSend';
import MessagesList from './MessagesList/MessagesList';
import { MessageContextProvider } from '../../contexts/MessageContext';

function Chat() {
  const location = useLocation();
  const { messages, id } = location.state;

  return (
    <div className="chat">
      <Header />
      <div className="chat-content">
        <MessagesList />
        <MessageFormSend receiverId={id} messages={messages} />
      </div>
      <Footer />
    </div>
  );
}

export default React.memo(Chat);
