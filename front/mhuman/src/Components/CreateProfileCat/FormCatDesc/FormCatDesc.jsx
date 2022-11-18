import './formcatdescstyles.scss';
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Button, TextArea, Icon, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { addCatProfileRequest } from '../../../requests/profilesRequest';
import useCatProfileReducer, { getActionInitValue, getActionSetValue } from '../../../hooks/useCatProfileReducer';
import AddCatProfileContext from '../../../contexts/AddCatProfileContext';
import { setToken } from '../../../requests/instance';

function FormCatDesc({
  handleReturnClick,
}) {
  const { catInformation } = useContext(AddCatProfileContext);
  const { catProfileState, catProfileDispatch } = useCatProfileReducer();
  const [errorMessage, setErrorMessage] = useState('');
  const [SucceededCreateCatProfil, setSucceededCreateCatProfil] = useState(false);

  const fetchData = async (data) => {
    try {
      const response = await addCatProfileRequest(data);
      if (response.status === 200) {
        setSucceededCreateCatProfil(true);
      }
    } catch (error) {
      // TODO : Récupérer l'erreur de l'API et renvoyer un message à l'utilisateur
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    setToken(localStorage.getItem('Token'));
    catProfileDispatch(getActionInitValue(catInformation));
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const data = new FormData();
    data.append('fileUpload', catProfileState.fileUpload);
    data.append('pseudo', catProfileState.pseudo);
    data.append('name', catProfileState.name);
    data.append('description', catProfileState.description);
    data.append('age', catProfileState.age);
    data.append('race', catProfileState.race);
    data.append('sexe', catProfileState.sexe);
    data.append('color', catProfileState.color);
    data.append('likes_pets', catProfileState.likes_pets);
    data.append('likes_kids', catProfileState.likes_kids);
    data.append('needs_garden', catProfileState.needs_garden);

    if (!catProfileState.description.trim()) {
      setErrorMessage('Une description est obligatoire');
    }

    fetchData(data);
  };
  const handleTextFieldChange = (e) => {
    catProfileDispatch(getActionSetValue(e.target.name, e.target.value));
  };

  const handleDismiss = () => {
    setErrorMessage('');
  };

  return (
    <div className="form-container">
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
        // encType="multipart/form-data"
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
          {catProfileState.fileUpload
          && (
          <span>
            <img
              style={{ padding: '10px' }}
              width={150}
              height={150}
              src={URL.createObjectURL(catProfileState.fileUpload)}
              alt="Photos"
            />
          </span>
          )}
          <input
            className="form-desc-cat-input"
            name="fileUpload"
            onChange={(e) => {
              catProfileDispatch(getActionSetValue(e.target.name, e.target.files[0]));
            }}
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
