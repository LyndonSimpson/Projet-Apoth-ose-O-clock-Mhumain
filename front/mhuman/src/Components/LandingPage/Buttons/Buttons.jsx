import React from 'react';
import { Button } from 'semantic-ui-react';
import './buttonstyles.scss';
import PropTypes from 'prop-types';
import Logo from '../logo.png';

function Buttons({
  handleSignUpClick,
  handleLogInClick,
}) {
  return (

    <div className="container">
      <div className="landingTitle">
        <img src={Logo} alt="logo" />
      </div>
      <div className="buttons">
        <Button
          onClick={handleSignUpClick}
          size="big"
        >
          M'inscrire
        </Button>
        <Button
          onClick={handleLogInClick}
          size="big"
        >
          Me connecter

        </Button>
      </div>
    </div>
  );
}

Buttons.propTypes = {
  handleSignUpClick: PropTypes.func.isRequired,
  handleLogInClick: PropTypes.func.isRequired,
};

export default React.memo(Buttons);
