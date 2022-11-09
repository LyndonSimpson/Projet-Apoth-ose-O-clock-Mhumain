import './formhumancheckboxstyles.scss';
import React, { useState } from 'react';
import {
  Checkbox, Form, Button, Icon,
} from 'semantic-ui-react';
import FormHumanInformations from '../FormHumanInformations/FormHumanInformations';
import Checkboxes from './utils/checkboxesHuman';

function FormHumanCheckbox() {
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
          />
        )}
    </>
  );
}

export default React.memo(FormHumanCheckbox);
