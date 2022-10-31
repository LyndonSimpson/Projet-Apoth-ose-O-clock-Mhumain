import React, { useState } from 'react';
import './LogIn.scss';
import { Button, Form, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Logo from '../LandingPage/logo.png';

function LogIn({
  handleReturnClick,
}) {
  const [emailValue, SetEmailValue] = useState('');
  const [passwordValue, SetPasswordValue] = useState('');

  return (
    <div className="loginContent">
      <main className="loginMain">
        <div className="loginMainForm">
          <Form>
            <div className="landingTitle">
              <img src={Logo} alt="logo" />
            </div>
            <h3> Connexion </h3>
            <Form.Field>
              <input
                placeholder="E-Mail"
                value={emailValue}
                onChange={(e) => { SetEmailValue(e.target.value); }}
              />
            </Form.Field>
            <Form.Field>
              <input
                placeholder="Password"
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
