/* eslint-disable jsx-a11y/label-has-associated-control */
import './formhumaninformationstyles.scss';
import React, { useState } from 'react';
import {
  Button, Icon, Form, Input, Message,
} from 'semantic-ui-react';

import PropTypes from 'prop-types';
import FormHumanDesc from '../FormHumanDesc/FormHumanDesc';

function FormHumanInformations({
  handleReturnClick,
}) {
  const [next, setNext] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [pseudoValue, setPseudoValue] = useState('');
  const [ageValue, setAgeValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
                control={Input}
                placeholder="Name"
                value={nameValue}
                onChange={(e) => { setNameValue(e.target.value); }}
              />
              <Input
                className="form-informations-input"
                id="form-input-control-last-name"
                control={Input}
                placeholder="Pseudo"
                value={pseudoValue}
                onChange={(e) => { setPseudoValue(e.target.value); }}
              />
              <Input
                className="form-informations-input"
                label={{ basic: true, content: 'ans' }}
                labelPosition="right"
                placeholder="Entrez votre âge"
                type="number"
                value={ageValue}
                onChange={(e) => { setAgeValue(e.target.value); }}
              />
            </Form.Group>

            <div className="form-informations-radios">
              <Form.Group grouped>
                <label htmlFor="has_pets">Avez-vous des animaux ?</label>
                <Form.Field
                  label="Oui"
                  control="input"
                  type="radio"
                  name="has_pets"
                />
                <Form.Field
                  label="Non"
                  control="input"
                  type="radio"
                  name="has_pets"
                />
              </Form.Group>
              <Form.Group grouped>
                <label htmlFor="has_kids">Avez-vous des enfants ?</label>
                <Form.Field
                  label="Oui"
                  control="input"
                  type="radio"
                  name="has_kids"
                />
                <Form.Field
                  label="Non"
                  control="input"
                  type="radio"
                  name="has_kids"
                />
              </Form.Group>
              <Form.Group grouped>
                <label htmlFor="has_garden">Avez-vous un jardin ?</label>
                <Form.Field
                  label="Oui"
                  control="input"
                  type="radio"
                  name="has_garden"
                />
                <Form.Field
                  label="Non"
                  control="input"
                  type="radio"
                  name="has_garden"
                />
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
          <FormHumanDesc />
        )}
    </>
  );
}

FormHumanInformations.propTypes = {
  handleReturnClick: PropTypes.func.isRequired,
};

export default React.memo(FormHumanInformations);
