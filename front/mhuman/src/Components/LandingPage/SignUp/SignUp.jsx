import React, { useState } from 'react';
import {
  Button, Form, Message, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import useUserReducer, { getActionReset, getActionSetValue } from '../../../hooks/useUserReducer';

import Logo from '../logo.png';
import './signupstyles.scss';

function SignUp({
  handleReturnClick,
  handleSucceededCreateUser,
}) {
  const { userState, userDispatch } = useUserReducer();
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async ({ email, password, passwordConfirm }) => {
    try {
      const response = await axios.post('http://localhost:3001/user/signup', {
        email: emailvalue,
        password: passwordvalue,
        passwordConfirm: confirmPasswordValue,

      });
      if (response.status === 200) {
        handleSucceededCreateUser();
      }
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
    // Je verifie que l'utilisateur à entré un mot de passe
    if (!userState.password.trim()) {
      setErrorMessage('Le mot de passe est obligatoire');
      return;
    }
    // Je verifie si l'utilisateur à bien confirmer son mot de passe
    if (userState.password !== userState.passwordConfirm) {
      setErrorMessage('Votre confirmation de mot de passe est incorrect');
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
    <div className="signup-form">
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
      <Form onSubmit={handleSubmit}>
        <h3> Créer un compte </h3>
        <Form.Field>
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={userState.email}
            onChange={handleTextFieldChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="password"
            placeholder="Mot de passe"
            type="password"
            value={userState.password}
            onChange={handleTextFieldChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            name="passwordConfirm"
            placeholder="Confirmer le mot de passe"
            type="password"
            value={userState.passwordConfirm}
            onChange={handleTextFieldChange}
          />
        </Form.Field>
        <div className="signup-buttons">
          <Button
            size="big"
            type="button"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            size="big"
            type="submit"
          >
            Valider
          </Button>
        </div>
      </Form>
      <div className="return-button">
        <Button
          onClick={handleReturnClick}
          size="big"
          animated="fade"
        >
          <Button.Content visible>Retour</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow left" />
          </Button.Content>
        </Button>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  handleReturnClick: PropTypes.func.isRequired,
  handleSucceededCreateUser: PropTypes.func.isRequired,
};

export default React.memo(SignUp);
