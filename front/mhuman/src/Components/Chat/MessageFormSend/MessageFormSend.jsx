import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import './messageFormSendStyles.scss';
import MessageContext from '../../../contexts/MessageContext';
import { addCatMessageRequest, addHumanMessageRequest } from '../../../requests/messageRequests';

function MessageFormSend({ receiverId }) {
  const { sendMessage } = useContext(MessageContext);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const type = localStorage.getItem('type');

  useEffect(() => {
    // sur le mount on met le focus sur l'input
    inputRef.current?.focus(); // le ?. remplace un if =>  if (inputRef.current) { inputRef.current.focus();}
  }, []);

  const fetchMessage = async (id, content) => {
    if (type === 'cat') {
      await addCatMessageRequest({ receiver_id: id, content });
    } else {
      await addHumanMessageRequest({ receiver_id: id, content });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) {
      // si je n'ai aucun texte de noté je ne fait rien
      return;
    }

    // on envoie la valeur au container du state message
    sendMessage({ author: localStorage.getItem('profilePseudo'), messageText: value.trim() });
    fetchMessage(receiverId, value.trim());

    // je reset l'input
    setValue('');
  };

  return (
    <form className="sendMessage" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        placeholder="Saisissez votre message..."
        className="sendMessage-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="sendMessage-submit"
      >
        <Icon name="send" size="big" />
      </button>
    </form>
  );
}
MessageFormSend.propTypes = {
  receiverId: PropTypes.number.isRequired,
};

MessageFormSend.defaultProps = {};

export default React.memo(MessageFormSend);
