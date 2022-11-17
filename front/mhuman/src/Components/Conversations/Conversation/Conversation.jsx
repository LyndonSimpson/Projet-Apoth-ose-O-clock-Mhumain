import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

import './conversationStyles.scss';

function Conversation({ image, pseudo }) {
  return (
    <div className="conversation-item">
      <Image className="conversation-image" src={image} size="tiny" rounded />
      <p>
        Ma conversation avec
        {' '}
        {pseudo}
      </p>
    </div>
  );
}

Conversation.propTypes = {
  image: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
};

export default React.memo(Conversation);
