import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './LogIn.scss';
import {
  Button, Form, Icon, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Logo from '../logo.png';

function LogIn({
  handleReturnClick,
  handleConnectedUser,
}) {
  const [emailValue, SetEmailValue] = useState('romain@street.fr');
  const [passwordValue, SetPasswordValue] = useState('Wesh_1');
  const [errorMessage, setErrorMessage] = useState('');
  const [isConnected, setIsConnected] = useState('');

  const fetchData = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        email,
        password,
      });
      if (response.status === 200) {
        handleConnectedUser(response.data);
        setIsConnected(true);
      }
    } catch (err) {
      setErrorMessage(err.response.data);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // Je verifie que l'utilisateur à entré un email
    if (!emailValue.trim()) {
      setErrorMessage("L'email est obligatoire");
      return;
    }
    // Je verifie que l'utilisateur à entré un mot de passe
    if (!passwordValue.trim()) {
      setErrorMessage('Le mot de passe est obligatoire');
    }
    // Je récupere les données de la base de donnée pour les comparer aux entrés de l'utilisateur
    fetchData(emailValue, passwordValue);
  };

  const handleDismiss = () => {
    setErrorMessage('');
  };

  return (
    <div className="loginContent">
      <main className="loginMain">
        <div className="loginMainForm">
          <Form onSubmit={handleSubmit}>
            <div className="landingTitle">
              <img src={Logo} alt="logo" />
            </div>
            {isConnected && (
              <Navigate to="/profileselect" />
            )}
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
            <h3> Connexion </h3>
            <Form.Field>
              <input
                placeholder="E-Mail"
                type="email"
                value={emailValue}
                onChange={(e) => { SetEmailValue(e.target.value); }}
              />
            </Form.Field>
            <Form.Field>
              <input
                placeholder="Password"
                type="password"
                value={passwordValue}
                onChange={(e) => { SetPasswordValue(e.target.value); }}
              />
            </Form.Field>
            <Button size="big" type="submit"> Se connecter </Button>
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
      </main>
      <footer className="loginFooter" />
    </div>
  );
}

LogIn.propTypes = {
  handleReturnClick: PropTypes.func.isRequired,
  handleConnectedUser: PropTypes.func.isRequired,
};

export default React.memo(LogIn);
