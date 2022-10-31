import React, { useState } from 'react';
import {
  Button, Form, Message, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Logo from '../LandingPage/logo.png';
import './signupstyles.scss';

function SignUp({
  handleReturnClick,
}) {
  const [emailValue, SetEmailValue] = useState('');
  const [passwordValue, SetPasswordValue] = useState('');
  const [confirmPasswordValue, SetConfirmPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleReset = () => { // reset all input
    SetEmailValue('');
    SetPasswordValue('');
    SetConfirmPasswordValue('');
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!emailValue.trim()) {
      setErrorMessage("L'email est obligatoire");
      return;
    }
    if (!passwordValue.trim()) {
      setErrorMessage('Le mot de passe est obligatoire');
      return;
    }
    if (passwordValue !== confirmPasswordValue) {
      setErrorMessage('Votre confirmation de mot de passe est incorrect');
      return;
    }
    // TODO : use emailValue and passwordValue for add new user in db
    setErrorMessage('TODO : use emailValue and passwordValue for add new user in db');
    handleReset();
  };
  const handleDismiss = () => {
    setErrorMessage('');
  };

  // TODO : add message for error on information

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
            placeholder="Email"
            value={emailValue}
            onChange={(e) => { SetEmailValue(e.target.value); }}
          />
        </Form.Field>
        <Form.Field>
          <input
            placeholder="Mot de passe"
            type="password"
            value={passwordValue}
            onChange={(e) => { SetPasswordValue(e.target.value); }}
          />
        </Form.Field>
        <Form.Field>
          <input
            placeholder="Confirmer le mot de passe"
            type="password"
            value={confirmPasswordValue}
            onChange={(e) => { SetConfirmPasswordValue(e.target.value); }}
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
};

export default React.memo(SignUp);
