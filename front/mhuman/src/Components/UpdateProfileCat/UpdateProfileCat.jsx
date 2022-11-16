/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import './updateprofilecatstyles.scss';
import {
  Button, Icon, TextArea, Input, Form, Radio, Dropdown, Message,
} from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import { updateCatProfileRequest, updateCatImageProfileRequest } from '../../requests/profilesRequest';
import { deleteCatProfile } from '../../requests/deleteProfileRequest';
import useCatProfileReducer, { getActionSetValue, getActionInitValue } from '../../hooks/useCatProfileReducer';
import { setToken } from '../../requests/instance';
import { getOneCatRequest, getAllCatRequest } from '../../requests/getCatRequest';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function UpdateProfileCat() {
  const { catProfileState, catProfileDispatch } = useCatProfileReducer();
  const [UpdateCatProfil, setUpdateUpdateCatProfil] = useState(false);
  const [listOption, setListOption] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [existedPseudo, setExistedPseudo] = useState(true);
  const [cats, setCats] = useState([]);
  const Token = localStorage.getItem('Token');

  const PseudoExist = (param) => cats.some((e) => e.pseudo === param);
  const fetchData = async (data) => {
    try {
      const response = await updateCatProfileRequest(data);
      if (response.status === 200) {
        setUpdateUpdateCatProfil(true);
      }
    } catch (error) {
      // TODO : Récupérer l'erreur de l'API et renvoyer un message à l'utilisateur
      console.log(error.message);
    }
  };

  const fetchFileUpload = async (data) => {
    try {
      const response = await updateCatImageProfileRequest(data);
      if (response.status === 200) {
        setUpdateUpdateCatProfil(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const selectedSexe = [
    { key: 'male', text: 'Mâle', value: 'male' },
    { key: 'femelle', text: 'Femelle', value: 'femelle' },
  ];

  React.useEffect(() => {
    setToken(localStorage.getItem('Token'));
    async function getCats() {
      const response = await getAllCatRequest();
      setCats(response);
    }
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
    getCats();
    getCatBreed();
    getOneCatRequest().then((response) => {
      catProfileDispatch(getActionInitValue(response[0]));
    });
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

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
    if (!catProfileState.color.trim()) {
      setErrorMessage('La couleur est obligatoire');
      return;
    }

    fetchData({
      pseudo: catProfileState.pseudo,
      name: catProfileState.name,
      description: catProfileState.description,
      age: catProfileState.age,
      race: catProfileState.race,
      sexe: catProfileState.sexe,
      color: catProfileState.color,
      likes_pets: catProfileState.likes_pets,
      likes_kids: catProfileState.likes_kids,
      needs_garden: catProfileState.needs_garden,
    });
    if (catProfileState.fileUpload) {
      const imageData = new FormData();
      imageData.append('fileUpload', catProfileState.fileUpload);
      fetchFileUpload(imageData);
    }
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

  const handlePseudoFieldChange = (e) => {
    catProfileDispatch(getActionSetValue(e.target.name, e.target.value));
    if (PseudoExist(e.target.value) || !e.target.value.trim()) {
      setExistedPseudo(true);
    } else {
      setExistedPseudo(false);
    }
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
            <span>
              <img
                style={{ padding: '10px' }}
                width={150}
                height={150}
                src={catProfileState.fileUpload ? URL.createObjectURL(catProfileState.fileUpload) : catProfileState.image}
                alt="Photos"
              />
            </span>
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
                    icon={existedPseudo ? 'close' : 'check'}
                    value={catProfileState.pseudo}
                    onChange={handlePseudoFieldChange}
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
                placeholder="Sélectionnez la race du chat"
                name="race"
                fluid
                selection
                value={catProfileState.race}
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
                <label htmlFor="likes_pets">Aime-t-il les animaux ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="likes_pets"
                    value="true"
                    checked={typeof catProfileState.likes_pets === 'boolean' ? catProfileState.likes_pets.toString() === 'true'
                      : catProfileState.likes_pets === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="likes_pets"
                    value="false"
                    checked={typeof catProfileState.likes_pets === 'boolean' ? catProfileState.likes_pets.toString() === 'false'
                      : catProfileState.likes_pets === 'false'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group grouped>
                <label htmlFor="likes_kids">Aime-t-il les enfants ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="likes_kids"
                    value="true"
                    checked={typeof catProfileState.likes_kids === 'boolean' ? catProfileState.likes_kids.toString() === 'true'
                      : catProfileState.likes_kids === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="likes_kids"
                    value="false"
                    checked={typeof catProfileState.likes_kids === 'boolean' ? catProfileState.likes_kids.toString() === 'false'
                      : catProfileState.likes_kids === 'false'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group grouped>
                <label htmlFor="needs_garden">A-t-il besoin d'un jardin ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="needs_garden"
                    value="true"
                    checked={typeof catProfileState.needs_garden === 'boolean' ? catProfileState.needs_garden.toString() === 'true'
                      : catProfileState.needs_garden === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="needs_garden"
                    value="false"
                    checked={typeof catProfileState.needs_garden === 'boolean' ? catProfileState.needs_garden.toString() === 'false'
                      : catProfileState.needs_garden === 'false'}
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
      {!Token && (
        <Navigate to="/" />
      )}
    </div>
  );
}

export default React.memo(UpdateProfileCat);
