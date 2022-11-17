import React, { useState } from 'react';

import './chatStyles.scss';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MessageFormSend from './MessageFormSend/MessageFormSend';
import MessagesList from './MessagesList/MessagesList';
import { getCatMessageRequest, getHumanMessageRequest } from '../../requests/messageRequests';

function Chat() {
  const location = useLocation();
  const { id } = location.state;
  const [messages, setMessages] = useState([]);
  const type = localStorage.getItem('type');

  React.useEffect(() => {
    const handleOldMessage = async (reiciverId) => {
      if (type === 'cat') {
        const response = await getCatMessageRequest(reiciverId);
        setMessages(response);
      } else {
        const response = await getHumanMessageRequest(reiciverId);
        setMessages(response);
      }
    };
    handleOldMessage(id);
  }, []);

  const AddNewMessage = (obj) => {
    setMessages((oldMessages) => [
      ...oldMessages,
      {
        author: obj.author,
        message: obj.messageText,
      },
    ]);
  };

  return (
    <div className="chat">
      <Header />
      <div className="chat-content">
        <MessagesList messages={messages} />
        <MessageFormSend receiverId={id} handleNewMessage={AddNewMessage} />
      </div>
      <Footer />
    </div>
  );
}

export default React.memo(Chat);
