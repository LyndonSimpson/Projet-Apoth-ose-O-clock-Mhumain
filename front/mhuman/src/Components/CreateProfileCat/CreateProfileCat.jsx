import React from 'react';
import './createprofilecatstyles.scss';
import FormCatCheckbox from './FormCatCheckbox/FormCatCheckbox';
import FormAPI from '../FormAPI/FormAPI';
import Logo from '../../styles/logo.png';

function CreateProfileCat() {
  return (
    <div className="profile">
      <div className="profile-form">
        <div className="create-title">
          <img className="profile-logo" src={Logo} alt="logo" />
        </div>
        <FormCatCheckbox />
      </div>
      <div className="profile-API">
        <FormAPI />
      </div>
    </div>
  );
}

export default React.memo(CreateProfileCat);
