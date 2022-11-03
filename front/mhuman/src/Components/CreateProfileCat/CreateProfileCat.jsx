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
  const [colorValue, setColorValue] = useState('');
  const [sexeValue, setSexeValue] = useState('');
  const [catBreedsValue, setCatBreedsValue] = useState('');
  const [likesPets, setLikesPets] = useState('false');
  const [likesKids, setLikesKids] = useState('false');
  const [needsGarden, setNeedsGarden] = useState('false');
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
        race: payload.race,
        sexe: payload.sexe,
        color: payload.color,
        likes_pets: payload.likes_pets,
        likes_kids: payload.likes_kids,
        needs_garden: payload.needs_garden,
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
  const handleColorValue = (value) => {
    setColorValue(value);
  };
  const handleCatBreedsValue = (value) => {
    setCatBreedsValue(value);
  };
  const handleSexeValue = (value) => {
    setSexeValue(value);
  };
  const handleLikesPets = (evt, { value }) => {
    setLikesPets(value);
  };
  const handleLikesKids = (evt, { value }) => {
    setLikesKids(value);
  };
  const handleNeedsGarden = (evt, { value }) => {
    setNeedsGarden(value);
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
      race: catBreedsValue,
      color: colorValue,
      sexe: sexeValue,
      likes_pets: likesPets,
      likes_kids: likesKids,
      needs_garden: needsGarden,
    });
  };

  return (
    <div className="profile">
      <div className="profile-form">
        <div className="create-title">
          <img className="profile-logo" src={Logo} alt="logo" />
        </div>
        <FormCatCheckbox
          nameValue={nameValue}
          handleNameValue={handleNameValue}
          pseudoValue={pseudoValue}
          handlePseudoValue={handlePseudoValue}
          ageValue={ageValue}
          handleAgeValue={handleAgeValue}
          colorValue={colorValue}
          handleColorValue={handleColorValue}
          catBreedsValue={catBreedsValue}
          handleCatBreedsValue={handleCatBreedsValue}
          sexeValue={sexeValue}
          handleSexeValue={handleSexeValue}
          likesPets={likesPets}
          handleLikesPets={handleLikesPets}
          likesKids={likesKids}
          handleLikesKids={handleLikesKids}
          needsGarden={needsGarden}
          handleNeedsGarden={handleNeedsGarden}
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
