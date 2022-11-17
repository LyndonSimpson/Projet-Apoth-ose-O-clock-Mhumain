import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ConversationsList from './ConversationsList/ConversationsList';
import './conversationsStyles.scss';
import MobileNav from '../Header/MobileNav/MobileNav';
import { getCatConversationsRequest, getHumanConversationsRequest } from '../../requests/messageRequests';
import { setToken } from '../../requests/instance';

function Conversations() {
  const [conversations, setConversations] = useState([]);
  const type = localStorage.getItem('type');

  React.useEffect(() => {
    setToken(localStorage.getItem('Token'));
    const getConversations = async () => {
      if (type === 'cat') {
        const response = await getCatConversationsRequest();
        setConversations(response);
      } else {
        const response = await getHumanConversationsRequest();
        setConversations(response);
      }
    };
    getConversations();
  }, []);

  return (
    <div className="conversations-styles">
      <Header />
      <ConversationsList conversations={conversations} />
      <Footer />

      <MobileNav
        type={type}
      />
    </div>
  );
}

export default React.memo(Conversations);
