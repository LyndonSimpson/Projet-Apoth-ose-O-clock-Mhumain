import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './createprofilecatstyles.scss';
import axios from 'axios';
import FormCatCheckbox from './FormCatCheckbox/FormCatCheckbox';
import FormAPI from '../FormAPI/FormAPI';
import Logo from '../../styles/logo.png';

function CreateProfileCat() {
  const [nameValue, setNameValue] = useState('');
  const [pseudoValue, setPseudoValue] = useState('');
  const [ageValue, setAgeValue] = useState('');
  const [hasPets, setHasPets] = useState('false');
  const [hasKids, setHasKids] = useState('false');
  const [hasGarden, setHasGarden] = useState('false');
  const [contentValue, setContentValue] = useState('');
  const [SucceededCreateCatProfil, setSucceededCreateCatProfil] = useState(false);

  const fetchData = async (payload) => {
    try {
      const response = await axios.post('http://localhost:3001/cat', {
        image: payload.image, // TODO : gérer les images (upload sur public et envoyer le nom de l'image)
        account_id: payload.account_id, // TODO : Gérer l'id de l'utilisateur en cours
        pseudo: payload.pseudo,
        name: payload.name,
        description: payload.description,
        age: payload.age,
        has_pets: payload.has_pets,
        has_kids: payload.has_kids,
        has_garden: payload.has_garden,
      });
      console.log(response);
      if (response.status === 200) {
        setSucceededCreateCatProfil(true);
      }
    } catch (error) {
      // TODO : Récupérer l'erreur de l'API et renvoyer un message à l'utilisateur
      console.log(error.message);
    }
  };

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

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    if (!contentValue.trim()) { // TODO : ajouter un message d'erreur pour l'utilisateur
      return;
    }
    fetchData({
      image: 'todo.png', // TODO : gérer les images (upload sur public et envoyer le nom de l'image)
      account_id: 1, // TODO : Gérer l'id de l'utilisateur en cours
      pseudo: pseudoValue,
      name: nameValue,
      description: contentValue,
      age: ageValue,
      has_pets: hasPets,
      has_kids: hasKids,
      has_garden: hasGarden,
    });
  };

  return (
    <div className="profile">
      <div className="profile-form">
        <div className="create-title">
          <img src={Logo} alt="logo" />
        </div>
        <FormCatCheckbox
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
          handleSubmitForm={handleSubmitForm}
        />
      </div>
      <div className="profile-API">
        <FormAPI />
      </div>
      {SucceededCreateCatProfil && (
        <Navigate to="/profileselect" />
      )}
    </div>
  );
}

export default React.memo(CreateProfileCat);
