import React from 'react';
import './createprofilecatstyles.scss';
import FormCatCheckbox from './FormCatCheckbox/FormCatCheckbox';
import FormAPI from '../FormAPI/FormAPI';
import Logo from '../../styles/logo.png';
import { AddCatProfileContextProvider } from '../../contexts/AddCatProfileContext';

function CreateProfileCat() {
  return (
    <AddCatProfileContextProvider>
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
    </AddCatProfileContextProvider>
  );
}

export default React.memo(CreateProfileCat);
