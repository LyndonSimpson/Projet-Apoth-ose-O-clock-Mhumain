import './formcatdescstyles.scss';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button, TextArea, Icon, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import useCatProfileReducer, { getActionSetValue } from '../../../hooks/useCatProfileReducer';

function FormCatDesc({
  handleReturnClick,
}) {
  const { catProfileState, catProfileDispatch } = useCatProfileReducer();
  const [image, setImage] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [SucceededCreateCatProfil, setSucceededCreateCatProfil] = useState(false);

  const fetchData = async (payload) => {
    try {
      const response = await axios.post('http://localhost:3001/human', {
        image: payload.image, // TODO : gérer les images (upload sur public et envoyer le nom de l'image)
        pseudo: payload.pseudo,
        name: payload.name,
        description: payload.description,
        age: payload.age,
        race: payload.breed,
        sexe: payload.sexe,
        likes_pets: payload.likesPets,
        likes_kids: payload.likesKids,
        needs_garden: payload.needsGarden,
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!catProfileState.description.trim()) {
      setErrorMessage('Une description est obligatoire');
    }
    fetchData({
      image: 'todo.png', // TODO : gérer les images (upload sur public et envoyer le nom de l'image)
      pseudo: catProfileState.pseudo,
      name: catProfileState.name,
      description: catProfileState.description,
      age: catProfileState.age,
      race: catProfileState.breed,
      sexe: catProfileState.sexe,
      likes_pets: catProfileState.likesPets,
      likes_kids: catProfileState.likesKids,
      needs_garden: catProfileState.needsGarden,
    });
  };
  const handleTextFieldChange = (e) => {
    catProfileDispatch(getActionSetValue(e.target.name, e.target.value));
  };

  const handleDismiss = () => {
    setErrorMessage('');
  };

  return (
    <div>
      {errorMessage
          && (
          <Message
            negative
            className="error-msg"
            header="Erreur"
            onDismiss={handleDismiss}
            content={errorMessage}
          />
          )}
      <form
        className="form-desc-cat"
        onSubmit={handleSubmit}
      >
        <TextArea
          className="form-desc-cat-area"
          rows={2}
          placeholder="A propos du chat..."
          name="description"
          value={catProfileState.description}
          onChange={handleTextFieldChange}
        />

        <div>
          {
          Array.from(image).map((item) => (
            <span>
              <img
                style={{ padding: '10px' }}
                width={150}
                height={150}
                src={item ? URL.createObjectURL(item) : null}
                alt="Photos"
              />
            </span>
          ))
        }
          <input
            className="form-desc-cat-input"
            onChange={(e) => {
              setImage(e.target.files);
            }}
            multiple
            type="file"
            accept="image/*"
            id="fileUpload"
          />

        </div>

        <div className="form-desc-cat-buttons">
          <Button
            className="form-desc-cat-button"
            onClick={handleReturnClick}
            animated="fade"
          >
            <Button.Content visible>Retour</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>

          <Button
            className="form-desc-cat-button"
            animated="fade"
            type="submit"
          >
            <Button.Content visible>Je veux adopter un humain!</Button.Content>
            <Button.Content hidden>
              <Icon name="heart" />
            </Button.Content>
          </Button>
        </div>
      </form>
      {SucceededCreateCatProfil && (
        <Navigate to="/profileselect" />
      )}
    </div>

  );
}

FormCatDesc.propTypes = {
  handleReturnClick: PropTypes.func.isRequired,
};

export default React.memo(FormCatDesc);
