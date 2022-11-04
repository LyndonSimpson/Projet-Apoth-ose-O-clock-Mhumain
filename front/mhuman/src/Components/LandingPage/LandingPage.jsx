import React, { useState } from 'react';

import PropTypes from 'prop-types';

import './landingpagestyles.scss';

import Buttons from './Buttons/Buttons';

import videoCat from '../../videos/videoCat.mp4';

import LogIn from './LogIn/LogIn';

import SignUp from './SignUp/SignUp';

function LandingPage({

  handleConnectedUser,

}) {
  const [choice, setChoice] = useState('');

  const handleSignUp = () => {
    setChoice('SignUp');
  };

  const handleLogIn = () => {
    setChoice('LogIn');
  };

  const handleReturnButton = () => {
    setChoice('');
  };

  return (

    <div className="landingContent">

      <video
        autoPlay
        muted
        loop
        id="background-video"

      >

        <source src={videoCat} />

      </video>

      {!choice

        && (

        <Buttons
          handleSignUpClick={handleSignUp}
          handleLogInClick={handleLogIn}

        />

        )}

      {choice === 'SignUp'

      && (

        <SignUp
          handleReturnClick={handleReturnButton}
          handleSucceededCreateUser={handleLogIn}

        />

      )}

      {choice === 'LogIn'

      && (

        <LogIn
          handleReturnClick={handleReturnButton}
          handleConnectedUser={handleConnectedUser}

        />

      )}

    </div>

  );
}

LandingPage.propTypes = {

  handleConnectedUser: PropTypes.func.isRequired,

};

export default React.memo(LandingPage);
