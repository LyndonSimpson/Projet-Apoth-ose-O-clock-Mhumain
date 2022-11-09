/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import './updateprofilehumanstyles.scss';
import {
  Button, Icon, TextArea, Input, Form, Radio, Image,
} from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import cat from '../../styles/cat.jpg';
import useHumanProfileReducer, { getActionSetValue } from '../../hooks/useHumanProfileReducer';

function UpdateProfileHuman() {
  const { humanProfileState, humanProfileDispatch } = useHumanProfileReducer();
  const [UpdateHumanProfil, setUpdateCreateHumanProfil] = useState(false);

  const fetchData = async (payload) => {
    try {
      const response = await axios.patch('http://localhost:3001/human', {
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
        setUpdateCreateHumanProfil(true);
      }
    } catch (error) {
      // TODO : Récupérer l'erreur de l'API et renvoyer un message à l'utilisateur
      console.log(error.message);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // if (!humanProfileState.description.trim()) {
    //   setErrorMessage('Une description est obligatoire');
    // }
    fetchData({
      image: 'todo.png', // TODO : gérer les images (upload sur public et envoyer le nom de l'image)
      account_id: 1, // TODO : Gérer l'id de l'utilisateur en cours
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

  const handleRadioFieldChange = (e, { name, value }) => {
    humanProfileDispatch(getActionSetValue(name, value));
  };

  return (
    <div className="update-profile">
      {/* {errorMessage
              && (
              <Message
                negative
                className="error-msg"
                header="Erreur"
                onDismiss={handleDismiss}
                content={errorMessage}
              />
              )} */}
      <form
        onSubmit={handleSubmit}
        className="form-update-human"
      >
        <div className="form-update-image">
          <Image.Group size="small">
            <Image src={cat} />
          </Image.Group>
        </div>
        <div className="form-update-all-informations">
          <div className="form-update-informations">
            <div className="form-update-input">
              <Form.Group className="form-informations">
                <Input
                  className="form-informations-input"
                  id="form-input-control-first-name"
                  placeholder="Name"
                  name="name"
                  value={humanProfileState.name}
                  onChange={handleTextFieldChange}
                />
                <Input
                  className="form-informations-input"
                  id="form-input-control-last-name"
                  placeholder="Pseudo"
                  name="pseudo"
                  value={humanProfileState.pseudo}
                  onChange={handleTextFieldChange}
                />
                <Input
                  className="form-informations-input"
                  label={{ basic: true, content: 'ans' }}
                  labelPosition="right"
                  placeholder="Entrez votre âge"
                  type="number"
                  name="age"
                  value={humanProfileState.age}
                  onChange={handleTextFieldChange}
                />
              </Form.Group>
            </div>

            <div className="form-update-area">
              <TextArea
                className="form-update-human-area"
                rows={7}
                name="description"
                placeholder="Dites-nous en plus sur vous..."
                value={humanProfileState.description}
                onChange={handleTextFieldChange}
              />
            </div>
          </div>

          <div className="form-update-radios">
            <Form.Group grouped>
              <label htmlFor="hasPets">Avez-vous des animaux ?</label>
              <Form.Field>
                <Radio
                  label="Oui"
                  name="hasPets"
                  value="true"
                  checked={humanProfileState.hasPets === 'true'}
                  onChange={handleRadioFieldChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Non"
                  name="hasPets"
                  value="false"
                  checked={humanProfileState.hasPets === 'false'}
                  onChange={handleRadioFieldChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group grouped>
              <label htmlFor="hasKids">Avez-vous des enfants ?</label>
              <Form.Field>
                <Radio
                  label="Oui"
                  name="hasKids"
                  value="true"
                  checked={humanProfileState.hasKids === 'true'}
                  onChange={handleRadioFieldChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Non"
                  name="hasKids"
                  value="false"
                  checked={humanProfileState.hasKids === 'false'}
                  onChange={handleRadioFieldChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group grouped>
              <label htmlFor="hasGarden">Avez-vous un jardin ?</label>
              <Form.Field>
                <Radio
                  label="Oui"
                  name="hasGarden"
                  value="true"
                  checked={humanProfileState.hasGarden === 'true'}
                  onChange={handleRadioFieldChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Non"
                  name="hasGarden"
                  value="false"
                  checked={humanProfileState.hasGarden === 'false'}
                  onChange={handleRadioFieldChange}
                />
              </Form.Field>
            </Form.Group>
          </div>
        </div>
      </form>
      <div className="form-update-human-buttons">
        <Button
          className="form-update-human-button"
          animated="fade"
          type="submit"
        >
          <Button.Content visible>Enregistrer</Button.Content>
          <Button.Content hidden>
            <Icon name="check" />
          </Button.Content>
        </Button>
      </div>
      { UpdateHumanProfil && (
      <Navigate to="/homepage" />
      )}
    </div>
  );
}

export default React.memo(UpdateProfileHuman);
