import React from 'react';
import './createprofilecatstyles.scss';
import { Link, Navigate } from 'react-router-dom';
import FormCatCheckbox from './FormCatCheckbox/FormCatCheckbox';
import FormAPI from '../FormAPI/FormAPI';
import Logo from '../../styles/logo.png';

function CreateProfileCat() {
  const Token = localStorage.getItem('Token');
  return (
    <div className="profile">
      <div className="profile-form">
        <div className="create-title">
          <Link to="/profileselect"><img className="profile-logo" src={Logo} alt="logo adopte ton mhumains" /></Link>
        </div>
        <FormCatCheckbox />
      </div>
      <div className="profile-API">
        <FormAPI />
      </div>
      {!Token && (
        <Navigate to="/" />
      )}
    </div>
  );
}

export default React.memo(CreateProfileCat);
