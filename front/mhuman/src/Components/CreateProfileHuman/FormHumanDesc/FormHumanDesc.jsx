import './formhumandescstyles.scss';
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button, TextArea, Icon, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { addHumanProfileRequest } from '../../../requests/profilesRequest';
import useHumanProfileReducer, { getActionInitValue, getActionSetValue } from '../../../hooks/useHumanProfileReducer';
import AddHumanProfileContext from '../../../contexts/AddHumanProfileContext';
import { setToken } from '../../../requests/instance';

function FormHumanDesc({
  handleReturnClick,
}) {
  const { humanInformation } = useContext(AddHumanProfileContext);
  const { humanProfileState, humanProfileDispatch } = useHumanProfileReducer();
  const [errorMessage, setErrorMessage] = useState('');
  const [SucceededCreateHumanProfil, setSucceededCreateHumanProfil] = useState(false);

  const fetchData = async (data) => {
    try {
      const response = await addHumanProfileRequest(data);
      console.log(response);
      if (response[0].pseudo === humanProfileState.pseudo) {
        setSucceededCreateHumanProfil(true);
      }
    } catch (error) {
      // TODO : Récupérer l'erreur de l'API et renvoyer un message à l'utilisateur
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    console.log('context>>>', humanInformation);
    humanProfileDispatch(getActionInitValue(humanInformation));
    console.log('state>>>', humanProfileState);
    setToken(localStorage.getItem('Token'));
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const data = new FormData();
    data.append('fileUpload', humanProfileState.fileUpload[0]);
    data.append('pseudo', humanProfileState.pseudo);
    data.append('name', humanProfileState.name);
    data.append('description', humanProfileState.description);
    data.append('age', humanProfileState.age);
    data.append('has_pets', humanProfileState.hasPets);
    data.append('has_kids', humanProfileState.hasKids);
    data.append('has_garden', humanProfileState.hasGarden);

    if (!humanProfileState.description.trim()) {
      setErrorMessage('Une description est obligatoire');
    }

    fetchData(data);
  };

  const handleTextFieldChange = (e) => {
    humanProfileDispatch(getActionSetValue(e.target.name, e.target.value));
  };

  const handleDismiss = () => {
    setErrorMessage('');
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData();

  //  for let (i = 0; i < images.length; i++) {
  //  data.append('images', images[i])
  // }

  //   axios.post('http://localhost:3001/human', data)
  //     .then((e) => {
  //       console.log('Success');
  //     })
  //     .catch((e) => {
  //       console.log('Error', e);
  //     });
  // };

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
          Array.from(humanProfileState.fileUpload).map((item) => (
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
            name="fileUpload"
            onChange={(e) => {
              humanProfileDispatch(getActionSetValue(e.target.name, e.target.files));
            }}
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
