import React, { useState } from 'react';
import './createprofilehumanstyles.scss';
import FormHumanCheckbox from './FormHumanCheckbox/FormHumanCheckbox';
import FormAPI from '../FormAPI/FormAPI';
import Logo from '../../styles/logo.png';

function CreateProfileHuman() {
  const [nameValue, setNameValue] = useState('');
  const [pseudoValue, setPseudoValue] = useState('');
  const [ageValue, setAgeValue] = useState('');
  const [hasPets, setHasPets] = useState('false');
  const [hasKids, setHasKids] = useState('false');
  const [hasGarden, setHasGarden] = useState('false');
  const [contentValue, setContentValue] = useState('');

  const handleNameValue = (value) => {
    setNameValue(value);
  };
  const handlePseudoValue = (value) => {
    setPseudoValue(value);
  };
  const handleAgeValue = (value) => {
    setAgeValue(value);
  };
  const handleHasPets = (evt, { value }) => {
    setHasPets(value);
  };
  const handleHasKids = (evt, { value }) => {
    setHasKids(value);
  };
  const handleHasGarden = (evt, { value }) => {
    setHasGarden(value);
  };
  const handleContentValue = (value) => {
    setContentValue(value);
  };

  return (
    <div className="profile">
      <div className="profile-form">
        <div className="create-title">
          <img src={Logo} alt="logo" />
        </div>
        <FormHumanCheckbox
          nameValue={nameValue}
          handleNameValue={handleNameValue}
          pseudoValue={pseudoValue}
          handlePseudoValue={handlePseudoValue}
          ageValue={ageValue}
          handleAgeValue={handleAgeValue}
          hasPets={hasPets}
          handleHasPets={handleHasPets}
          hasKids={hasKids}
          handleHasKids={handleHasKids}
          hasGarden={hasGarden}
          handleHasGarden={handleHasGarden}
          contentValue={contentValue}
          handleContentValue={handleContentValue}
        />
      </div>
      <div className="profile-API">
        <FormAPI />
      </div>
    </div>
  );
}

export default React.memo(CreateProfileHuman);
