import React from 'react';
import PropTypes from 'prop-types';

import './messageStyles.scss';

function Message({
  author, message, isMine,
}) {
  return (
    <div className={isMine ? 'message message__ismine' : 'message'}>
      <div className="message-author">
        {author}
      </div>
      <div className="message-body">
        {message}
      </div>
    </div>
  );
}
Message.propTypes = {
  author: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isMine: PropTypes.bool.isRequired,
};

Message.defaultProps = {};

export default React.memo(Message);
