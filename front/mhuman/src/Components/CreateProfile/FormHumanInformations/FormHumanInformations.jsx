/* eslint-disable jsx-a11y/label-has-associated-control */
import './formhumaninformationstyles.scss';
import React, { useState } from 'react';
import {
  Button, Icon, Form, Input,
} from 'semantic-ui-react';
import FormHumanDesc from '../FormHumanDesc/FormHumanDesc';

function FormHumanInformations() {
  const [next, setNext] = useState('');

  const handleFormButton = () => {
    setNext('FormHumanDesc');
  };

  return (
    <>
      {!next && (
        <div className="form-human">
          <Form.Group widths="equal">
            <Form.Field
              id="form-input-control-first-name"
              control={Input}
              placeholder="Name"
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              placeholder="Pseudo"
            />
            <Input
              label={{ basic: true, content: 'ans' }}
              labelPosition="right"
              placeholder="Entrez votre âge"
              type="number"
            />
          </Form.Group>
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
          <div className="form-human-button">
            <Button
              onClick={handleFormButton}
              animated
            >
              <Button.Content visible>Next</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </div>
        </div>
      )}
      {next === 'FormHumanDesc'
        && (
          <FormHumanDesc />
        )}
    </>
  );
}

export default React.memo(FormHumanInformations);
