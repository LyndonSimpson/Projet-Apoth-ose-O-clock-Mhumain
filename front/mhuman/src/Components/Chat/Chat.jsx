import React, { useState } from 'react';

import './chatStyles.scss';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MessageFormSend from './MessageFormSend/MessageFormSend';
import MessagesList from './MessagesList/MessagesList';
import AdoptThisMhuman from './AdoptThisMhuman/AdoptThisMhuman';
import { getCatMessageRequest, getHumanMessageRequest } from '../../requests/messageRequests';
import { setToken } from '../../requests/instance';
import ConfirmModale from './ConfirmModale/ConfirmModale';
import adoptMyHuman from '../../requests/adoptHumanRequest';

function Chat() {
  const location = useLocation();
  const { id } = location.state;
  const [messages, setMessages] = useState([]);
  const [openModale, setOpenModale] = useState(false);
  const [adoptionSuccess, setAdoptionSuccess] = useState(null);
  const type = localStorage.getItem('type');
  const isAdopted = localStorage.getItem('isAdopted');
  const Token = setToken(localStorage.getItem('Token'));

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

  const handleAdoptButton = () => {
    setOpenModale(true);
  };

  const toggleConfirmModale = () => {
    setOpenModale(!openModale);
  };

  const handleAdoptMhuman = async () => {
    try {
      const response = await adoptMyHuman(id);
      if (response.status === 200) {
        setAdoptionSuccess('Félicitations! Vous avez votre nouvel humain de compagnie!');
        toggleConfirmModale();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat">
      <Header
        type={type}
      />
      {type === 'cat'
        && (isAdopted !== 'true' ? (
          adoptionSuccess || <AdoptThisMhuman handleAdoptButton={handleAdoptButton} />
        ) : ('Tu as déja ton humain, arrête d\'essayer de trouver une gamelle ailleurs !')
        )}

      <div className="chat-content">
        <MessagesList messages={messages} />
        <MessageFormSend receiverId={id} handleNewMessage={AddNewMessage} />
      </div>
      <Footer />
      {openModale
        && (
          <ConfirmModale open={openModale} setOpen={toggleConfirmModale} handleAdoptMhuman={handleAdoptMhuman} />
        )}
      {!Token && (
      <Navigate to="/" />
      )}
    </div>
  );
}

export default React.memo(Chat);
