/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import './updateprofilecatstyles.scss';
import {
  Button, Icon, TextArea, Input, Form, Radio, Image, Dropdown,
} from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import cat from '../../styles/cat.jpg';
import useCatProfileReducer, { getActionSetValue } from '../../hooks/useCatProfileReducer';
import MobileNav from '../HomePage/MobileNav/MobileNav';

function UpdateProfileCat() {
  const { catProfileState, catProfileDispatch } = useCatProfileReducer();
  const [UpdateCatProfil, setUpdateCreateCatProfil] = useState(false);
  const [listOption, setListOption] = useState([]);

  const fetchData = async (payload) => {
    try {
      const response = await axios.patch('http://localhost:3001/cat', {
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
        setUpdateCreateCatProfil(true);
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
    // if (!catProfileState.description.trim()) {
    //   setErrorMessage('Une description est obligatoire');
    // }
    fetchData({
      image: 'todo.png', // TODO : gérer les images (upload sur public et envoyer le nom de l'image)
      account_id: 1, // TODO : Gérer l'id de l'utilisateur en cours
      pseudo: catProfileState.pseudo,
      name: catProfileState.name,
      description: catProfileState.description,
      age: catProfileState.age,
      has_pets: catProfileState.hasPets,
      has_kids: catProfileState.hasKids,
      has_garden: catProfileState.hasGarden,
    });
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
        </form>
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
        { UpdateCatProfil && (
        <Navigate to="/homepage" />
        )}

      </div>

      {/* <MobileNav className="mobile-nav" /> */}
    </>
  );
}

export default React.memo(UpdateProfileCat);
