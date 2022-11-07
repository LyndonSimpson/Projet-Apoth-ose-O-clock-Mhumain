/* eslint-disable jsx-a11y/label-has-associated-control */
import './formcatinformationstyles.scss';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import {
  Button, Icon, Form, Input, Message, Radio, Dropdown,
} from 'semantic-ui-react';

import propTypes from 'prop-types';
import FormCatDesc from '../FormCatDesc/FormCatDesc';
import useCatProfileReducer, { getActionSetValue } from '../../../hooks/useCatProfileReducer';
import AddCatProfileContext from '../../../contexts/AddCatProfileContext';

function FormCatInformations({
  handleReturnClick,
}) {
  const { addCatInformation, catInformation } = useContext(AddCatProfileContext);
  const { catProfileState, catProfileDispatch } = useCatProfileReducer();
  const [next, setNext] = useState('');
  const [listOption, setListOption] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
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
    console.log(catProfileState);
    addCatInformation(catProfileState);
    console.log(catInformation);
    setNext('FormCatDesc');
  };
  const handleDismiss = () => {
    setErrorMessage('');
  };
  const handleReturnButton = () => {
    setNext('');
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

  const options = [
    { key: 'mois', text: 'mois', value: 'mois' },
    { key: 'ans', text: 'ans', value: 'ans' },
  ];

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

  return (
    <>
      {!next && (
        <div className="form-cat-informations">
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
          <form>
            <Form.Group className="form-informations">
              <Input
                className="form-informations-input"
                id="form-input-control-first-name"
                placeholder="Nom du chat"
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
                label={<Dropdown defaultValue="mois" options={options} />}
                labelPosition="right"
                placeholder="Entrez l'âge du chat"
                name="age"
                type="number"
                value={catProfileState.age}
                onChange={handleTextFieldChange}
              />
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
            </Form.Group>

            <div className="form-informations-radios">
              <Form.Group>
                <label htmlFor="likesPets">Aime-t-il les autres animaux ?</label>
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
            <div className="form-cat-buttons">
              <Button
                className="form-cat-button"
                onClick={handleReturnClick}
                animated="fade"
              >
                <Button.Content visible>Retour</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left" />
                </Button.Content>
              </Button>

              <Button
                className="form-cat-button"
                onClick={handleSubmit}
                animated="fade"
              >
                <Button.Content visible>Next</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </div>
          </form>
        </div>
      )}
      {next === 'FormCatDesc'
        && (
          <FormCatDesc
            handleReturnClick={handleReturnButton}
          />
        )}
    </>
  );
}

FormCatInformations.propTypes = {
  handleReturnClick: propTypes.func.isRequired,
};

export default React.memo(FormCatInformations);
