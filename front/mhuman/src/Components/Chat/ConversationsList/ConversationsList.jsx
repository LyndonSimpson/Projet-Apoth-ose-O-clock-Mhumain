import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Image } from 'semantic-ui-react';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import './conversationsliststyles.scss';
import MobileNav from '../../Header/MobileNav/MobileNav';
import { getCatConversationsRequest, getHumanConversationsRequest } from '../../../requests/messageRequests';

function ConversationsList() {
  const [conversations, setConversations] = useState([]);
  const type = localStorage.getItem('type');

  React.useEffect(() => {
    const getConversations = async () => {
      if (type === 'cat') {
        const response = await getCatConversationsRequest();
        setConversations(response);
      } else {
        const response = await getHumanConversationsRequest();
        setConversations('inComponent', response);
      }
    };
    getConversations();
  }, []);

  return (
    <div className="conversations-styles">
      <Header />
      <div
        className="conversations"
      >
        <h2 className="conversation-title">Mes conversations</h2>
        {conversations && (
          conversations.map(({ image, pseudo, id }) => (
            <Link to="/chat" state={id} key={id}>
              <div className="conversation-item">
                <Image className="conversation-image" src={image} size="tiny" rounded />
                <p>
                  Ma conversation avec
                  {' '}
                  {pseudo}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
      <Footer />

      <MobileNav
        type={type}
      />
    </div>
  );
}

export default React.memo(ConversationsList);
