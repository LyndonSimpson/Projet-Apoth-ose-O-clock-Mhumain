/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import './updateprofilecatstyles.scss';
import {
  Button, Icon, TextArea, Input, Form, Radio, Dropdown, Message,
} from 'semantic-ui-react';
import { Navigate, redirect } from 'react-router-dom';
import { updateCatProfileRequest } from '../../requests/profilesRequest';
import { deleteCatProfile } from '../../requests/deleteProfileRequest';
import useCatProfileReducer, { getActionSetValue, getActionInitValue } from '../../hooks/useCatProfileReducer';
import { setToken } from '../../requests/instance';
import { getOneCatRequest } from '../../requests/getCatRequest';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function UpdateProfileCat() {
  const { catProfileState, catProfileDispatch } = useCatProfileReducer();
  const [UpdateCatProfil, setUpdateUpdateCatProfil] = useState(false);
  const [listOption, setListOption] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async (data) => {
    try {
      const response = await updateCatProfileRequest(data);
      console.log(response);
      if (response[0].pseudo === catProfileState.pseudo) {
        setUpdateUpdateCatProfil(true);
      }
    } catch (error) {
      // TODO : Récupérer l'erreur de l'API et renvoyer un message à l'utilisateur
      console.log(error.message);
    }
  };

  const selectedSexe = [
    { key: 'male', text: 'Mâle', value: 'male' },
    { key: 'femelle', text: 'Femelle', value: 'femelle' },
  ];

  React.useEffect(() => {
    setToken(localStorage.getItem('Token'));
    async function getCatBreed() {
      const response = await axios.get('https://api.thecatapi.com/v1/breeds');
      const listOptions = response.data.map((element) => ({
        key: element.name,
        text: element.name,
        value: element.name,
        image: {
          avatar: true,
          src: element.image ? element.image.url : null,
          style: { width: '30px' },
        },
      }));
      listOptions.unshift({
        key: 'Chat de gouttière',
        text: 'Chat de gouttière',
        value: 'Chat de gouttière',
        image: {
          avatar: true,
          src: null,
          style: { width: '30px' },
        },
      });
      setListOption(listOptions);
    }
    getCatBreed();
    getOneCatRequest().then((response) => { catProfileDispatch(getActionInitValue(response[0])); });
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData();
    data.append('fileUpload', catProfileState.fileUpload[0]);
    data.append('pseudo', catProfileState.pseudo);
    data.append('name', catProfileState.name);
    data.append('description', catProfileState.description);
    data.append('age', catProfileState.age);
    data.append('race', catProfileState.race);
    data.append('sexe', catProfileState.sexe);
    data.append('color', catProfileState.color);
    data.append('likes_pets', catProfileState.likesPets);
    data.append('likes_kids', catProfileState.likesKids);
    data.append('needs_garden', catProfileState.needsGarden);

    if (!catProfileState.description.trim()) {
      setErrorMessage('Une description est obligatoire');
    }

    if (!catProfileState.name.trim()) {
      setErrorMessage('Le nom est obligatoire');
      return;
    }
    if (!catProfileState.pseudo.trim()) {
      setErrorMessage('Le pseudo est obligatoire');
      return;
    }
    if (!catProfileState.age.trim()) {
      setErrorMessage('L\'age est obligatoire');
      return;
    }
    if (!catProfileState.color.trim()) {
      setErrorMessage('La couleur est obligatoire');
      return;
    }

    fetchData(data);
  };

  const handleTextFieldChange = (e) => {
    catProfileDispatch(getActionSetValue(e.target.name, e.target.value));
  };

  const handleRadioFieldChange = (e, { name, value }) => {
    catProfileDispatch(getActionSetValue(name, value));
  };

  const handleDropdownChange = (e, data) => {
    catProfileDispatch(getActionSetValue(data.name, data.value));
  };

  const handleDismiss = () => {
    setErrorMessage('');
  };

  const handleDelete = () => {
    deleteCatProfile();
    setUpdateUpdateCatProfil(true);
  };

  return (
    <div className="update-page">
      <Header />
      <div className="update-profile-cat">
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
          className="form-update-cat"
        >
          <div className="form-update-image">
            <input
              className="form-desc-cat-input"
              name="fileUpload"
              onChange={(e) => {
                catProfileDispatch(getActionSetValue(e.target.name, e.target.files));
              }}
              type="file"
              accept="image/*"
              id="fileUpload"
            />
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
                    value={catProfileState.name}
                    onChange={handleTextFieldChange}
                  />
                  <Input
                    className="form-informations-input"
                    id="form-input-control-last-name"
                    placeholder="Pseudo"
                    name="pseudo"
                    value={catProfileState.pseudo}
                    onChange={handleTextFieldChange}
                  />
                  <Input
                    className="form-informations-input"
                    label={{ basic: true, content: 'ans' }}
                    labelPosition="right"
                    placeholder="Entrez votre âge"
                    type="number"
                    name="age"
                    value={catProfileState.age}
                    onChange={handleTextFieldChange}
                  />
                </Form.Group>
              </div>

              <div className="form-update-area">
                <TextArea
                  className="form-update-cat-area"
                  rows={7}
                  name="description"
                  placeholder="Dites-nous en plus sur vous..."
                  value={catProfileState.description}
                  onChange={handleTextFieldChange}
                />
              </div>
            </div>

            <div className="update-informations-cat-only">
              <Input
                className="form-informations-input"
                id="form-input-control-color"
                placeholder="Indiquez la couleur du chat"
                name="color"
                value={catProfileState.color}
                onChange={handleTextFieldChange}
              />
              <Dropdown
                className="form-informations-dropdown"
                clearable
                placeholder="Sélectionnez la race du chat"
                name="breed"
                fluid
                selection
                value={catProfileState.breed}
                options={listOption}
                onChange={handleDropdownChange}
              />
              <Dropdown
                className="form-informations-dropdown"
                placeholder="Sexe"
                name="sexe"
                selection
                options={selectedSexe}
                value={catProfileState.sexe}
                onChange={handleDropdownChange}
              />
            </div>

            <div className="form-update-radios">
              <Form.Group grouped>
                <label htmlFor="likesPets">Aime-t-il les animaux ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="likesPets"
                    value="true"
                    checked={catProfileState.likesPets === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="likesPets"
                    value="false"
                    checked={catProfileState.likesPets === 'false'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group grouped>
                <label htmlFor="likesKids">Aime-t-il les enfants ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="likesKids"
                    value="true"
                    checked={catProfileState.likesKids === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="likesKids"
                    value="false"
                    checked={catProfileState.likesKids === 'false'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group grouped>
                <label htmlFor="needsGarden">A-t-il besoin d'un jardin ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="needsGarden"
                    value="true"
                    checked={catProfileState.needsGarden === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="needsGarden"
                    value="false"
                    checked={catProfileState.needsGarden === 'false'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
              </Form.Group>
            </div>
          </div>
          <div className="form-update-cat-buttons">
            <Button
              className="delete-cat-profile"
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
              className="form-update-cat-button"
              animated="fade"
              type="submit"
            >
              <Button.Content visible>Enregistrer</Button.Content>
              <Button.Content hidden>
                <Icon name="check" />
              </Button.Content>
            </Button>
          </div>
        </form>

        { UpdateCatProfil && (
        <Navigate to="/profileselect" />
        )}
      </div>
      {/* <MobileNav className="mobile-nav" /> */}
      <Footer />
    </div>
  );
}

export default React.memo(UpdateProfileCat);
