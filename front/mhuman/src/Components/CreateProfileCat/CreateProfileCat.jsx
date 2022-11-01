import React from 'react';
import './createprofilecatstyles.scss';
import FormCat from './FormCatCheckbox/FormCatCheckbox';
import FormAPI from '../FormAPI/FormAPI';
import Logo from '../../styles/logo.png';

function CreateProfileCat() {
  return (
    <div className="profile">
      <div className="profile-form">
        <div className="create-title">
          <img src={Logo} alt="logo" />
        </div>
        <FormCat />
      </div>
      <div className="profile-API">
        <FormAPI />
      </div>
    </div>
  );
}

export default React.memo(CreateProfileCat);
