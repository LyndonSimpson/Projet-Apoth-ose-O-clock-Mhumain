import React from 'react';
import './createprofile.scss';
import FormHuman from './FormHumanCheckbox/FormHumanCheckbox';
import FormAPI from './FormAPI/FormAPI';
import Logo from '../../styles/logo.png';

function CreateProfile() {
  return (
    <div className="profile">
      <div className="profile-form">
        <div className="create-title">
          <img src={Logo} alt="logo" />
        </div>
        <FormHuman />
      </div>
      <div className="profile-API">
        <FormAPI />
      </div>
    </div>
  );
}

export default React.memo(CreateProfile);
