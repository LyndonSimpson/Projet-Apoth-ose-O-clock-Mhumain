/* eslint-disable jsx-a11y/label-has-associated-control */
import './formhumaninformationstyles.scss';
import React, { useState, useContext } from 'react';
import {
  Button, Icon, Form, Input, Message, Radio,
} from 'semantic-ui-react';

import propTypes from 'prop-types';
import FormHumanDesc from '../FormHumanDesc/FormHumanDesc';
import useHumanProfileReducer, { getActionSetValue } from '../../../hooks/useHumanProfileReducer';
import AddHumanProfileContext from '../../../contexts/AddHumanProfileContext';

function FormHumanInformations({
  handleReturnClick,
}) {
  const { HumanInformation, addHumanInformation } = useContext(AddHumanProfileContext);
  const { humanProfileState, humanProfileDispatch } = useHumanProfileReducer();
  const [next, setNext] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
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
    console.log(humanProfileState);
    addHumanInformation(humanProfileState);
    console.log(HumanInformation);
    setNext('FormHumanDesc');
  };
  const handleDismiss = () => {
    setErrorMessage('');
  };

  const handleTextFieldChange = (e) => {
    humanProfileDispatch(getActionSetValue(e.target.name, e.target.value));
  };

  const handleRadioFieldChange = (e, { name, value }) => {
    humanProfileDispatch(getActionSetValue(name, value));
  };

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
                name="age"
                type="number"
                value={humanProfileState.age}
                onChange={handleTextFieldChange}
              />
            </Form.Group>

            <div className="form-informations-radios">
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
            </div>
            <div className="form-human-buttons">
              <Button
                className="form-human-button"
                onClick={handleReturnClick}
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
          />
        )}
    </>
  );
}

FormHumanInformations.propTypes = {
  handleReturnClick: propTypes.func.isRequired,
};

export default React.memo(FormHumanInformations);
