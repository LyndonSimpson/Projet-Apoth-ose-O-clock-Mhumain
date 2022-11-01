import './formcatcheckboxstyles.scss';
import React, { useState } from 'react';
import {
  Checkbox, Form, Button, Icon,
} from 'semantic-ui-react';
import FormCatInformations from '../FormCatInformations/FormCatInformations';
import Checkboxes from './utils/checkboxesCat';

function FormCatCheckbox() {
  const [next, setNext] = useState('');
  const [isChecked, setIsChecked] = useState(
    new Array(Checkboxes.length).fill(false),
  );

  const handleFormButton = () => {
    setNext('FormCatInformations');
  };

  const handleCheck = (position) => {
    const updatedCheckedState = isChecked.map((item, index) => (index === position ? !item : item));

    setIsChecked(updatedCheckedState);
  };

  return (
    <>
      {!next && (
      <div className="form-checkbox">
        <Form className="check-cat">
          {Checkboxes.map(({ description, id }, index) => (
            <Form.Field
              key={id}
              control={Checkbox}
              name={description}
              value={description}
              checked={isChecked[index]}
              onChange={() => handleCheck(index)}
              label={description}
            />
          ))}

        </Form>
        <div className="check-cat-button">
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
      {next === 'FormCatInformations'
        && (
          <FormCatInformations />
        )}
    </>
  );
}

export default React.memo(FormCatCheckbox);
