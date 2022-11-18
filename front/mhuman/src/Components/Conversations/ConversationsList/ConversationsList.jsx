import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Conversation from '../Conversation/Conversation';

import './conversationsListStyles.scss';

function ConversationsList({ conversations }) {
  return (
    <div className="conversations">
      <h2 className="conversation-title">Mes conversations</h2>
      {conversations.length > 0 && (
        conversations.map(({ image, pseudo, id }) => (
          <Link to="/chat" state={{ id }} key={id}>
            <Conversation image={image} pseudo={pseudo} />
          </Link>
        ))
      )}
    </div>
  );
}

ConversationsList.propTypes = {
  conversations: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    pseudo: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default React.memo(ConversationsList);
