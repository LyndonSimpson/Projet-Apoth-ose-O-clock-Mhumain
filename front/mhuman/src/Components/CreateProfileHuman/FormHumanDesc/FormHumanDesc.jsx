import './formhumandescstyles.scss';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button, TextArea, Icon, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import useHumanProfileReducer, { getActionSetValue } from '../../../hooks/useHumanProfileReducer';

function FormHumanDesc({
  handleReturnClick,
}) {
  const { humanProfileState, humanProfileDispatch } = useHumanProfileReducer();
  const [image, setImage] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [SucceededCreateHumanProfil, setSucceededCreateHumanProfil] = useState(false);

  const fetchData = async (payload) => {
    try {
      const response = await axios.post('http://localhost:3001/human', {
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
        setSucceededCreateHumanProfil(true);
      }
    } catch (error) {
      // TODO : Récupérer l'erreur de l'API et renvoyer un message à l'utilisateur
      console.log(error.message);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!humanProfileState.description.trim()) {
      setErrorMessage('Une description est obligatoire');
    }
    fetchData({
      image: 'todo.png', // TODO : gérer les images (upload sur public et envoyer le nom de l'image)
      pseudo: humanProfileState.pseudo,
      name: humanProfileState.name,
      description: humanProfileState.description,
      age: humanProfileState.age,
      has_pets: humanProfileState.hasPets,
      has_kids: humanProfileState.hasKids,
      has_garden: humanProfileState.hasGarden,
    });
  };

  const handleTextFieldChange = (e) => {
    humanProfileDispatch(getActionSetValue(e.target.name, e.target.value));
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
        className="form-desc-human"
        onSubmit={handleSubmit}
      >
        <TextArea
          className="form-desc-human-area"
          rows={2}
          name="description"
          placeholder="Dites-nous en plus sur vous..."
          value={humanProfileState.description}
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
            className="form-desc-human-input"
            onChange={(e) => {
              setImage(e.target.files);
            }}
            multiple
            type="file"
            accept="image/*"
            id="fileUpload"
          />

        </div>

        <div className="form-desc-human-buttons">
          <Button
            className="form-desc-human-button"
            onClick={handleReturnClick}
            animated="fade"
          >
            <Button.Content visible>Retour</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>

          <Button
            className="form-desc-human-button"
            size="big"
            animated="fade"
            type="submit"
          >
            <Button.Content visible>Je veux me faire adopter par un chat!</Button.Content>
            <Button.Content hidden>
              <Icon name="heart" />
            </Button.Content>
          </Button>
        </div>
      </form>
      {SucceededCreateHumanProfil && (
        <Navigate to="/profileselect" />
      )}

    </div>

  );
}

FormHumanDesc.propTypes = {
  handleReturnClick: PropTypes.func.isRequired,
};

export default React.memo(FormHumanDesc);
