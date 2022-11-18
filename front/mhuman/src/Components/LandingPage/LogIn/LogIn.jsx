import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './LogIn.scss';
import {
  Button, Form, Icon, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Logo from '../logo.png';
import { loginRequest } from '../../../requests/loginRequest';

function LogIn({
  handleReturnClick,
}) {
  const [emailValue, SetEmailValue] = useState('');
  const [passwordValue, SetPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isConnected, setIsConnected] = useState('');

  const fetchData = async (email, password) => {
    try {
      const response = await loginRequest(email, password);
      if (response.logged) {
        setIsConnected(true);
        localStorage.setItem('userEmail', response.pseudo);
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
              <a href="/forgotpassword" className="forgot-password">Mot de passe oublié ?</a>
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
};

export default React.memo(LogIn);
