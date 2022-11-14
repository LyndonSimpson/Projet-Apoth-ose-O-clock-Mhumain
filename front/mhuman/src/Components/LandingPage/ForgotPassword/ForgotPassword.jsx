import React, { useState } from 'react';
import {
  Button, Form, Message, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useUserReducer, { getActionReset, getActionSetValue } from '../../../hooks/useUserReducer';

import Logo from '../logo.png';
import './forgotpasswordstyles.scss';

function ForgotPassword() {
  const { userState, userDispatch } = useUserReducer();
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async ({ email }) => {
    try {
      await axios.post('http://localhost:3001/user/signup', {
        email,
      });
    } catch (err) {
      setErrorMessage(err.response.data);
    }
  };

  const handleTextFieldChange = (e) => {
    userDispatch(getActionSetValue(e.target.name, e.target.value));
  };

  const handleReset = () => userDispatch(getActionReset());

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // Je verifie que l'utilisateur à entré un email
    if (!userState.email.trim()) {
      setErrorMessage("L'email est obligatoire");
      return;
    }
    // TODO : use emailValue and passwordValue for add new user in db
    fetchData(userState);
    handleReset();
  };
  const handleDismiss = () => { // Gere la fermeture du message
    setErrorMessage('');
  };

  return (
    <div className="forgotpassword-form">
      <div className="landingTitle">
        <img src={Logo} alt="logo" />
      </div>
      {errorMessage
          && (
          <Message
            negative
            className="error-msg"
            header="Erreur"
            onDismiss={handleDismiss}
            content={errorMessage}
          />
          )}
      <Form className="forgotpassword-form" onSubmit={handleSubmit}>
        <h3> Mot de passe oublié </h3>
        <Form.Field>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={userState.email}
            onChange={handleTextFieldChange}
          />
        </Form.Field>

        <div className="forgotpassword-buttons">
          <Button
            size="big"
            type="submit"
          >
            Valider
          </Button>
        </div>
      </Form>
      <div className="return-button">
        <Link to="/"><Icon name="home" size="big" /></Link>
      </div>
    </div>
  );
}

export default React.memo(ForgotPassword);