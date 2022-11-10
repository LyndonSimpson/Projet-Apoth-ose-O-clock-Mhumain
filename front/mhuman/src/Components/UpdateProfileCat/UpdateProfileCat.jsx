/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import './updateprofilecatstyles.scss';
import {
  Button, Icon, TextArea, Input, Form, Radio, Image, Dropdown,
} from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import cat from '../../styles/cat.jpg';

import { updateCatProfileRequest } from '../../requests/profilesRequest';
import useCatProfileReducer, { getActionSetValue, getActionInitValue } from '../../hooks/useCatProfileReducer';
import AddCatProfileContext from '../../contexts/AddCatProfileContext';
import { setToken } from '../../requests/instance';


function UpdateProfileCat() {
  const { catProfileState, catProfileDispatch } = useCatProfileReducer();
  const [UpdateCatProfil, setUpdateUpdateCatProfil] = useState(false);
  const [listOption, setListOption] = useState([]);

  const fetchData = async (payload) => {
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

  return (
    <>
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
          className="form-update-cat"
        >
          <div className="form-update-image">
            <Image.Group size="small">
              <Image rounded src={cat} />
            </Image.Group>
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
                <label htmlFor="hasPets">Avez-vous des animaux ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="hasPets"
                    value="true"
                    checked={catProfileState.hasPets === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="hasPets"
                    value="false"
                    checked={catProfileState.hasPets === 'false'}
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
                    checked={catProfileState.hasKids === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="hasKids"
                    value="false"
                    checked={catProfileState.hasKids === 'false'}
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
                    checked={catProfileState.hasGarden === 'true'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="hasGarden"
                    value="false"
                    checked={catProfileState.hasGarden === 'false'}
                    onChange={handleRadioFieldChange}
                  />
                </Form.Field>
              </Form.Group>
            </div>
          </div>
          <div className="form-update-cat-buttons">
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
        <Navigate to="/homepage" />
        )}

      </div>

      {/* <MobileNav className="mobile-nav" /> */}
    </>
  );
}

export default React.memo(UpdateProfileCat);
