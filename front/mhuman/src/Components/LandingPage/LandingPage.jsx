import React, { useState } from 'react';
import './landingpagestyles.scss';
import Buttons from './Buttons/Buttons';
import videoCat from '../../videos/videoCat.mp4';
import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';

function LandingPage() {
  const [choice, setChoice] = useState('');
  const handleSignUpButton = () => {
    setChoice('SignUp');
  };

  const handleLogInButton = () => {
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
          handleSignUpClick={handleSignUpButton}
          handleLogInClick={handleLogInButton}
        />
        )}
      {choice === 'SignUp'
      && (
        <SignUp
          handleReturnClick={handleReturnButton}
        />
      )}
      {choice === 'LogIn'
      && (
        <LogIn
          handleReturnClick={handleReturnButton}
        />
      )}
    </div>
  );
}

export default React.memo(LandingPage);
