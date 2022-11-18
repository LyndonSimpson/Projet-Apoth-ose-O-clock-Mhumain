import React from 'react';
import './createprofilehumanstyles.scss';
import { Navigate, Link } from 'react-router-dom';
import FormHumanCheckbox from './FormHumanCheckbox/FormHumanCheckbox';
import FormAPI from '../FormAPI/FormAPI';
import Logo from '../../styles/logo.png';

function CreateProfileHuman() {
  const Token = localStorage.getItem('Token');
  return (
    <div className="profile">
      <div className="profile-form">
        <div className="create-title">
          <Link to="/profileselect"><img className="profile-logo" src={Logo} alt="logo adopte ton mhumains" /></Link>
        </div>
        <FormHumanCheckbox />
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

export default React.memo(CreateProfileHuman);
