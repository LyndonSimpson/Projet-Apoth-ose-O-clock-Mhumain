import React, { useState } from 'react';
import {
  Button, Form, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { resetPasswordRequest } from '../../../requests/loginRequest';
import useUserReducer, { getActionReset, getActionSetValue } from '../../../hooks/useUserReducer';

import Logo from '../logo.png';
import './resetpasswordstyles.scss';

function ResetPassword({
  handleSucceededCreateUser,
}) {
  const { userState, userDispatch } = useUserReducer();
  const [errorMessage, setErrorMessage] = useState('');
  const { id, token } = useParams();

  const fetchData = async (userinfo, routeId, routeToken) => {
    try {
      const response = await resetPasswordRequest(userinfo, routeId, routeToken);
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
    fetchData(userState, id, token);
    handleReset();
  };
  const handleDismiss = () => { // Gere la fermeture du message
    setErrorMessage('');
  };

  return (
    <div className="resetpassword-form">
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
      <Form className="content-resetpassword" onSubmit={handleSubmit}>
        <h3> Modifier mon mot de passe </h3>
        <Form.Field>
          <input
            className="input-resetpassword"
            name="password"
            placeholder="Mot de passe"
            type="password"
            value={userState.password}
            onChange={handleTextFieldChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            className="input-resetpassword"
            name="passwordConfirm"
            placeholder="Confirmer le mot de passe"
            type="password"
            value={userState.passwordConfirm}
            onChange={handleTextFieldChange}
          />
        </Form.Field>
        <div className="resetpassword-buttons">
          <Button
            size="big"
            type="submit"
          >
            Valider
          </Button>
        </div>
      </Form>
    </div>
  );
}

ResetPassword.propTypes = {
  handleSucceededCreateUser: PropTypes.func.isRequired,
};

export default React.memo(ResetPassword);
