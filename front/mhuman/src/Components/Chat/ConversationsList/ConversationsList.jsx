import React from 'react';

import { Image } from 'semantic-ui-react';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import './conversationsliststyles.scss';
import MobileNav from '../../Header/MobileNav/MobileNav';
import Cat from '../../../styles/cat.jpg';

function ConversationsList() {
  const type = localStorage.getItem('type');
  return (
    <div className="conversations-styles">
      <Header />
      <div
        className="conversations"
      >
        <h2 className="conversation-title">Mes conversations</h2>
        <div className="conversation-item">
          <Image className="conversation-image" src={Cat} size="tiny" rounded />
          <p>Ma conversation avec Torchon</p>
        </div>

      </div>
      <Footer />

      <MobileNav
        type={type}
      />
    </div>
  );
}

export default React.memo(ConversationsList);
