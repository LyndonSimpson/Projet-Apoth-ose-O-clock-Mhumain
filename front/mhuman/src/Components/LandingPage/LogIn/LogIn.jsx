import React, { useState } from 'react';
import axios from 'axios';
import './LogIn.scss';
import {
  Button, Form, Icon, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Logo from '../logo.png';

function LogIn({
  handleReturnClick,
}) {
  const [emailValue, SetEmailValue] = useState('');
  const [passwordValue, SetPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user');
      return response.data;
    } catch (err) {
      setErrorMessage(err.message);
      return null;
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
    const users = await fetchData();
    if (!users) {
      return;
    }
    const found = users.find((user) => user.email === emailValue);
    // Si aucun mail ne correspond je renvoi une erreur à l'utilisateur
    if (!found) {
      setErrorMessage("Il n'existe aucun compte lié à cette email");
      return;
    }
    if (found.password === passwordValue) {
      // TODO redirect vers le sass d'accueil
      setErrorMessage('Vous etes connectés');
    } else {
      // Si le mot de passe ne correspond pas je renvoi une erreur à l'utilisateur
      setErrorMessage('Le mot de passe est incorrecte');
    }
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
};

export default React.memo(LogIn);
