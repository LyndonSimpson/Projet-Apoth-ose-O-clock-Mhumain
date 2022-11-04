import './formhumancheckboxstyles.scss';
import React, { useState } from 'react';
import {
  Checkbox, Form, Button, Icon,
} from 'semantic-ui-react';
import propTypes from 'prop-types';
import FormHumanInformations from '../FormHumanInformations/FormHumanInformations';
import Checkboxes from './utils/checkboxesHuman';

function FormHumanCheckbox({
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
  const [isChecked, setIsChecked] = useState(
    new Array(Checkboxes.length).fill(false),
  );

  const handleFormButton = () => {
    setNext('FormHumanInformations');
  };

  const handleCheck = (position) => {
    const updatedCheckedState = isChecked.map((item, index) => (index === position ? !item : item));

    setIsChecked(updatedCheckedState);
  };

  const handleReturnButton = () => {
    setNext('');
  };

  return (
    <>
      {!next && (
      <div className="form-checkbox">
        <Form className="check-human">
          {Checkboxes.map(({ description, id }, index) => (
            <Form.Field
              key={id}
              control={Checkbox}
              name={description}
              value={description}
              checked={isChecked[index]}
              onChange={() => handleCheck(index)}
              label={description}
              required
            />
          ))}

        </Form>
        <div className="check-human-button">
          <Button
            onClick={handleFormButton}
            animated
            disabled={!isChecked.every(Boolean)}
          >
            <Button.Content visible>Next</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </div>
      </div>
      )}
      {next === 'FormHumanInformations'
        && (
          <FormHumanInformations
            handleReturnClick={handleReturnButton}
            nameValue={nameValue}
            handleNameValue={handleNameValue}
            pseudoValue={pseudoValue}
            handlePseudoValue={handlePseudoValue}
            ageValue={ageValue}
            handleAgeValue={handleAgeValue}
            hasPets={hasPets}
            handleHasPets={handleHasPets}
            hasKids={hasKids}
            handleHasKids={handleHasKids}
            hasGarden={hasGarden}
            handleHasGarden={handleHasGarden}
            contentValue={contentValue}
            handleContentValue={handleContentValue}
            handleSubmitForm={handleSubmitForm}
          />
        )}
    </>
  );
}

FormHumanCheckbox.propTypes = {
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

export default React.memo(FormHumanCheckbox);
