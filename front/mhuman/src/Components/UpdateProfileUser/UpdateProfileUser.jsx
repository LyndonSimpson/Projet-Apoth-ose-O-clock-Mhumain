import React, { useState } from 'react';
import {
  Button, Form, Message,
} from 'semantic-ui-react';
import { Link, Navigate } from 'react-router-dom';
import useUserReducer, { getActionSetValue, getActionInitValue } from '../../hooks/useUserReducer';
import { deleteUserRequest, updateUserRequest, getOneUserRequest } from '../../requests/profilesRequest';
import Logo from '../LandingPage/logo.png';
import './updateprofileuserstyles.scss';
import { setToken } from '../../requests/instance';

function UpdateProfileUser() {
  const { userState, userDispatch } = useUserReducer();
  const [errorMessage, setErrorMessage] = useState('');
  const [accountDelete, setAccountDelete] = useState(false);
  const [UpdateUserProfile, setUpdateUserProfile] = useState(false);
  const Token = localStorage.getItem('Token');

  const fetchData = async (data) => {
    try {
      updateUserRequest(data);
      setUpdateUserProfile(true);
    } catch (err) {
      setErrorMessage(err.response.data);
    }
  };

  React.useEffect(() => {
    setToken(localStorage.getItem('Token'));
    getOneUserRequest().then((response) => { userDispatch(getActionInitValue(response[0])); });
  }, []);

  const handleTextFieldChange = (e) => {
    userDispatch(getActionSetValue(e.target.name, e.target.value));
  };

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
    fetchData(userState);
  };

  const handleDelete = () => {
    deleteUserRequest();
    setAccountDelete(true);
  };

  const handleDismiss = () => { // Gere la fermeture du message
    setErrorMessage('');
  };

  return (
    <div className="update-user">
      <div className="landingTitle">
        <Link to="/profileselect"><img className="profile-logo" src={Logo} alt="logo adopte ton mhumains" /></Link>
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
      <Form className="update-user-form" onSubmit={handleSubmit}>
        <h3> Modifier mon email ou mon mot de passe </h3>
        <div className="update-user-input">
          <Form.Field>
            <input
              className="update-user-input"
              name="email"
              placeholder="Email"
              type="email"
              value={userState.email}
              onChange={handleTextFieldChange}
            />
          </Form.Field>
          <Form.Field>
            <input
              className="update-user-input"
              name="password"
              placeholder="Nouveau mot de passe"
              type="password"
              value={userState.password || ''}
              onChange={handleTextFieldChange}
            />
          </Form.Field>
        </div>
        <div className="update-buttons">
          <Button
            size="big"
            type="submit"
          >
            Valider
          </Button>
          <Button
            negative
            size="big"
            onClick={handleDelete}
          >
            Supprimer mon compte
          </Button>
        </div>
      </Form>
      { UpdateUserProfile && (
        <Message
          success
          content="Vos modifications ont bien été prises en compte"
          className="success-message"
        />
      )}
      { accountDelete && (
        <Navigate to="/" />
      )}
      {!Token && (
        <Navigate to="/" />
      )}
    </div>
  );
}

export default React.memo(UpdateProfileUser);
