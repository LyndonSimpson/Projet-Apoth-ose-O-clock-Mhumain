/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import './updateprofilehumanstyles.scss';
import {
  Button, Icon, TextArea, Input, Form, Radio, Image, Message,
} from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import cat from '../../styles/cat.jpg';
import { updateHumanProfileRequest } from '../../requests/profilesRequest';

import useHumanProfileReducer, { getActionSetValue, getActionInitValue } from '../../hooks/useHumanProfileReducer';
import AddHumanProfileContext from '../../contexts/AddHumanProfileContext';
import { setToken } from '../../requests/instance';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function UpdateProfileHuman() {
  const { humanInformation } = useContext(AddHumanProfileContext);
  const { humanProfileState, humanProfileDispatch } = useHumanProfileReducer();
  const [UpdateHumanProfil, setUpdateCreateHumanProfil] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const pseudo = localStorage.getItem('profilePseudo');

  const fetchData = async (data) => {
    try {
      const response = await updateHumanProfileRequest(data);
      console.log(response);
      setUpdateCreateHumanProfil(true);
    } catch (error) {
      // TODO : Récupérer l'erreur de l'API et renvoyer un message à l'utilisateur
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    console.log('context>>>', humanInformation);
    humanProfileDispatch(getActionInitValue(humanInformation));
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

    if (!humanProfileState.name.trim()) {
      setErrorMessage('Le nom est obligatoire');
      return;
    }
    if (!humanProfileState.pseudo.trim()) {
      setErrorMessage('Le pseudo est obligatoire');
      return;
    }
    if (!humanProfileState.age.trim()) {
      setErrorMessage('L\'age est obligatoire');
      return;
    }

    fetchData(data);
  };

  const handleTextFieldChange = (e) => {
    humanProfileDispatch(getActionSetValue(e.target.name, e.target.value));
  };

  const handleRadioFieldChange = (e, { name, value }) => {
    humanProfileDispatch(getActionSetValue(name, value));
  };

  const handleDismiss = () => {
    setErrorMessage('');
  };

  return (
    <div className="update-page">
      <Header className="update-header" />
      <section className="update-profile">
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
          onSubmit={handleSubmit}
          className="form-update-human"
        >
          <section className="form-update-image">
            <Image.Group size="small">
              <Image src={cat} />
            </Image.Group>
            <input
              className="form-desc-cat-input"
              name="fileUpload"
              onChange={(e) => {
                humanProfileDispatch(getActionSetValue(e.target.name, e.target.files));
              }}
              type="file"
              accept="image/*"
              id="fileUpload"
            />
          </section>
          <section className="form-update-all-informations">
            <section className="form-update-informations">
              <section className="form-update-input">
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
              </section>

              <section className="form-update-area">
                <TextArea
                  className="form-update-human-area"
                  rows={7}
                  name="description"
                  placeholder="Dites-nous en plus sur vous..."
                  value={humanProfileState.description}
                  onChange={handleTextFieldChange}
                />
              </section>
            </section>

            <section className="form-update-radios">
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
            </section>
          </section>
          <section className="form-update-human-buttons">
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
          </section>
        </form>

        { UpdateHumanProfil && (
        <Navigate to="/homepage" />
        )}
      </section>
      <Footer />
    </div>
  );
}

export default React.memo(UpdateProfileHuman);
