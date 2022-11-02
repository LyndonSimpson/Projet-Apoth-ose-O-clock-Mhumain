/* eslint-disable jsx-a11y/label-has-associated-control */
import './formcatinformationstyles.scss';
import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, Icon, Form, Input, Message, Radio, Dropdown,
} from 'semantic-ui-react';

import propTypes from 'prop-types';
import FormCatDesc from '../FormCatDesc/FormCatDesc';

function FormCatInformations({
  handleReturnClick,
  nameValue,
  handleNameValue,
  pseudoValue,
  handlePseudoValue,
  ageValue,
  handleAgeValue,
  hasPets,
  handleHasPets,
  hasKids,
  handleHasKids,
  hasGarden,
  handleHasGarden,
  contentValue,
  handleContentValue,
  handleSubmitForm,
}) {
  const [next, setNext] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [catBreeds, setCatBreeds] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!nameValue.trim()) {
      setErrorMessage('Le nom est obligatoire');
      return;
    }
    if (!pseudoValue.trim()) {
      setErrorMessage('Le pseudo est obligatoire');
      return;
    }
    if (!ageValue.trim()) {
      setErrorMessage('L\'age est obligatoire');
      return;
    }
    setNext('FormCatDesc');
  };
  const handleDismiss = () => {
    setErrorMessage('');
  };

  const handleReturnButton = () => {
    setNext('');
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
      setCatBreeds(listOptions);
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
                placeholder="Name"
                value={nameValue}
                onChange={(e) => { handleNameValue(e.target.value); }}
              />
              <Input
                className="form-informations-input"
                id="form-input-control-last-name"
                placeholder="Pseudo"
                value={pseudoValue}
                onChange={(e) => { handlePseudoValue(e.target.value); }}
              />
              <Input
                className="form-informations-input"
                label={<Dropdown defaultValue="mois" options={options} />}
                labelPosition="right"
                placeholder="Entrez votre âge"
                type="number"
                value={ageValue}
                onChange={(e) => { handleAgeValue(e.target.value); }}
              />
              <Input
                className="form-informations-input"
                id="form-input-control-color"
                placeholder="Couleur"
                // value={colorValue}
                // onChange={(e) => { handleColorValue(e.target.value); }}
              />
              <Dropdown
                className="form-informations-dropdown"
                clearable
                placeholder="Selectionnez la race"
                fluid
                selection
                options={catBreeds}
              />
              <Dropdown
                className="form-informations-dropdown"
                placeholder="Sexe"
                selection
                options={selectedSexe}
              />
            </Form.Group>

            <div className="form-informations-radios">
              <Form.Group grouped>
                <label htmlFor="has_pets">Aime-t-il les autres animaux ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="has_pets"
                    value="true"
                    checked={hasPets === 'true'}
                    onChange={handleHasPets}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="has_pets"
                    value="false"
                    checked={hasPets === 'false'}
                    onChange={handleHasPets}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group grouped>
                <label htmlFor="has_kids">Aime-t-il les enfants ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="has_kids"
                    value="true"
                    checked={hasKids === 'true'}
                    onChange={handleHasKids}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="has_kids"
                    value="false"
                    checked={hasKids === 'false'}
                    onChange={handleHasKids}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group grouped>
                <label htmlFor="has_garden">A-t-il besoin d'un jardin ?</label>
                <Form.Field>
                  <Radio
                    label="Oui"
                    name="has_garden"
                    value="true"
                    checked={hasGarden === 'true'}
                    onChange={handleHasGarden}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Non"
                    name="has_garden"
                    value="false"
                    checked={hasGarden === 'false'}
                    onChange={handleHasGarden}
                  />
                </Form.Field>
              </Form.Group>
            </div>
            <div className="form-cat-buttons">
              <Button
                className="form-cat-button"
                onClick={handleReturnClick}
                size="big"
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
                size="big"
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
            contentValue={contentValue}
            handleContentValue={handleContentValue}
            handleSubmitForm={handleSubmitForm}
          />
        )}
    </>
  );
}

FormCatInformations.propTypes = {
  handleReturnClick: propTypes.func.isRequired,
  nameValue: propTypes.string.isRequired,
  handleNameValue: propTypes.func.isRequired,
  pseudoValue: propTypes.string.isRequired,
  handlePseudoValue: propTypes.func.isRequired,
  ageValue: propTypes.oneOfType([
    propTypes.number,
    propTypes.string,
  ]).isRequired,
  handleAgeValue: propTypes.func.isRequired,
  hasPets: propTypes.string.isRequired,
  handleHasPets: propTypes.func.isRequired,
  hasKids: propTypes.string.isRequired,
  handleHasKids: propTypes.func.isRequired,
  hasGarden: propTypes.string.isRequired,
  handleHasGarden: propTypes.func.isRequired,
  contentValue: propTypes.string.isRequired,
  handleContentValue: propTypes.func.isRequired,
  handleSubmitForm: propTypes.func.isRequired,
};

export default React.memo(FormCatInformations);
