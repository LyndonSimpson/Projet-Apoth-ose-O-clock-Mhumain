/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './updateprofilehumanstyles.scss';
import {
  Button, Icon, TextArea, Input, Form, Radio, Message,
} from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import { updateHumanProfileRequest, updateHumanImageProfileRequest } from '../../requests/profilesRequest';
import { deleteHumanProfile } from '../../requests/deleteProfileRequest';
import useHumanProfileReducer, { getActionSetValue, getActionInitValue } from '../../hooks/useHumanProfileReducer';
import { setToken } from '../../requests/instance';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getOneHumanRequest, getAllHumanRequest } from '../../requests/getHumanRequest';
import MobileNav from '../Header/MobileNav/MobileNav';

function UpdateProfileHuman() {
  const { humanProfileState, humanProfileDispatch } = useHumanProfileReducer();
  const [UpdateHumanProfil, setUpdateCreateHumanProfil] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [existedPseudo, setExistedPseudo] = useState(true);
  const [humans, setHumans] = useState([]);
  const Token = localStorage.getItem('Token');

  const PseudoExist = (param) => humans.some((e) => e.pseudo === param);
  const fetchData = async (data) => {
    try {
      const response = await updateHumanProfileRequest(data);
      if (response.status === 200) {
        setUpdateCreateHumanProfil(true);
      }
    } catch (error) {
      // TODO : Récupérer l'erreur de l'API et renvoyer un message à l'utilisateur
      console.log(error.message);
    }
  };

  const fetchFileUpload = async (data) => {
    try {
      const response = await updateHumanImageProfileRequest(data);
      if (response.status === 200) {
        setUpdateCreateHumanProfil(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    setToken(localStorage.getItem('Token'));
    async function getHumans() {
      const response = await getAllHumanRequest();
      setHumans(response);
    }
    getHumans();
    getOneHumanRequest().then((response) => { humanProfileDispatch(getActionInitValue(response[0])); });
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

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

    fetchData({
      pseudo: humanProfileState.pseudo,
      name: humanProfileState.name,
      description: humanProfileState.description,
      age: humanProfileState.age,
      has_pets: humanProfileState.has_pets,
      has_kids: humanProfileState.has_kids,
      has_garden: humanProfileState.has_garden,
    });
    if (humanProfileState.fileUpload) {
      const imageData = new FormData();
      imageData.append('fileUpload', humanProfileState.fileUpload);
      fetchFileUpload(imageData);
    }
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

  const handleDelete = () => {
    deleteHumanProfile();
    setUpdateCreateHumanProfil(true);
  };

  const handlePseudoFieldChange = (e) => {
    humanProfileDispatch(getActionSetValue(e.target.name, e.target.value));
    if (PseudoExist(e.target.value) || !e.target.value.trim()) {
      setExistedPseudo(true);
    } else {
      setExistedPseudo(false);
    }
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
          <div className="form-update-image">
            <span>
              <img
                style={{ padding: '10px' }}
                width={150}
                height={150}
                src={humanProfileState.fileUpload ? URL.createObjectURL(humanProfileState.fileUpload) : humanProfileState.image}
                alt="Photos"
              />
            </span>
            <input
              className="form-desc-cat-input"
              name="fileUpload"
              onChange={(e) => {
                humanProfileDispatch(getActionSetValue(e.target.name, e.target.files[0]));
              }}
              type="file"
              accept="image/*"
              id="fileUpload"
            />
          </div>
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
                    icon={existedPseudo ? 'close' : 'check'}
                    value={humanProfileState.pseudo}
                    onChange={handlePseudoFieldChange}
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
                <label htmlFor="has_pets">Avez-vous des animaux ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="has_pets"
                    value="true"
                    checked={typeof humanProfileState.has_pets === 'boolean' ? humanProfileState.has_pets.toString() === 'true'
                      : humanProfileState.has_pets === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="has_pets"
                    value="false"
                    checked={typeof humanProfileState.has_pets === 'boolean' ? humanProfileState.has_pets.toString() === 'false'
                      : humanProfileState.has_pets === 'false'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group grouped>
                <label htmlFor="has_kids">Avez-vous des enfants ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="has_kids"
                    value="true"
                    checked={typeof humanProfileState.has_kids === 'boolean' ? humanProfileState.has_kids.toString() === 'true'
                      : humanProfileState.has_kids === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="has_kids"
                    value="false"
                    checked={typeof humanProfileState.has_kids === 'boolean' ? humanProfileState.has_kids.toString() === 'false'
                      : humanProfileState.has_kids === 'false'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group grouped>
                <label htmlFor="has_garden">Avez-vous un jardin ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="has_garden"
                    value="true"
                    checked={typeof humanProfileState.has_garden === 'boolean' ? humanProfileState.has_garden.toString() === 'true'
                      : humanProfileState.has_garden === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="has_garden"
                    value="false"
                    checked={typeof humanProfileState.has_garden === 'boolean' ? humanProfileState.has_garden.toString() === 'false'
                      : humanProfileState.has_garden === 'false'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
              </Form.Group>
            </section>
          </section>
          <section className="form-update-human-buttons">
            <Button
              className="delete-human-profile"
              animated="fade"
              type="button"
              onClick={handleDelete}
              color="red"
            >
              <Button.Content visible>Supprimer ce profil</Button.Content>
              <Button.Content hidden>
                <Icon name="user delete" />
              </Button.Content>
            </Button>
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
        <Navigate to="/profileselect" />
        )}
      </section>
      <Footer />
      <MobileNav />
      {!Token && (
        <Navigate to="/" />
      )}
    </div>
  );
}

export default React.memo(UpdateProfileHuman);
