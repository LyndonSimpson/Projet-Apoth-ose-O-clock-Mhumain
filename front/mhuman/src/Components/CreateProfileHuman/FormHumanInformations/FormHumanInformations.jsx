/* eslint-disable jsx-a11y/label-has-associated-control */
import './formhumaninformationstyles.scss';
import React, { useState } from 'react';
import {
  Button, Icon, Form, Input, Message, Radio,
} from 'semantic-ui-react';

import propTypes from 'prop-types';
import FormHumanDesc from '../FormHumanDesc/FormHumanDesc';

function FormHumanInformations({
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
}) {
  const [next, setNext] = useState('');
  // const [nameValue, setNameValue] = useState('');
  // const [pseudoValue, setPseudoValue] = useState('');
  // const [ageValue, setAgeValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [selectedPetsRadio, setSelectedPetsRadio] = useState('false');
  // const [selectedKidsRadio, setSelectedKidsRadio] = useState('false');
  // const [selectedGardenRadio, setSelectedGardenRadio] = useState('false');

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
    }
    setNext('FormHumanDesc');
  };
  const handleDismiss = () => {
    setErrorMessage('');
  };

  // const handleChangePetsRadio = (evt, { value }) => {
  //   setSelectedPetsRadio(value);
  // };

  // const handleChangeKidsRadio = (evt, { value }) => {
  //   setSelectedKidsRadio(value);
  // };

  // const handleChangeGardenRadio = (evt, { value }) => {
  //   setSelectedGardenRadio(value);
  // };

  const handleReturnButton = () => {
    setNext('');
  };

  return (
    <>
      {!next && (
        <div className="form-human-informations">
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
                label={{ basic: true, content: 'ans' }}
                labelPosition="right"
                placeholder="Entrez votre âge"
                type="number"
                value={ageValue}
                onChange={(e) => { handleAgeValue(e.target.value); }}
              />
            </Form.Group>

            <div className="form-informations-radios">
              <Form.Group grouped>
                <label htmlFor="has_pets">Avez-vous des animaux ?</label>
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
                <label htmlFor="has_kids">Avez-vous des enfants ?</label>
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
                <label htmlFor="has_garden">Avez-vous un jardin ?</label>
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
            <div className="form-human-buttons">
              <Button
                className="form-human-button"
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
                className="form-human-button"
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
      {next === 'FormHumanDesc'
        && (
          <FormHumanDesc
            handleReturnClick={handleReturnButton}
            contentValue={contentValue}
            handleContentValue={handleContentValue}
          />
        )}
    </>
  );
}

FormHumanInformations.propTypes = {
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
};

export default React.memo(FormHumanInformations);
