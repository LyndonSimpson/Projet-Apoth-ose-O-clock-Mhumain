import './formcatcheckboxstyles.scss';
import React, { useState } from 'react';
import {
  Checkbox, Form, Button, Icon,
} from 'semantic-ui-react';
import propTypes from 'prop-types';
import FormCatInformations from '../FormCatInformations/FormCatInformations';
import Checkboxes from './utils/checkboxesCat';

function FormCatCheckbox({
  nameValue,
  handleNameValue,
  pseudoValue,
  handlePseudoValue,
  ageValue,
  handleAgeValue,
  colorValue,
  handleColorValue,
  catBreedsValue,
  handleCatBreedsValue,
  sexeValue,
  handleSexeValue,
  likesPets,
  handleLikesPets,
  likesKids,
  handleLikesKids,
  needsGarden,
  handleNeedsGarden,
  contentValue,
  handleContentValue,
  handleSubmitForm,
}) {
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

  const handleReturnButton = () => {
    setNext('');
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
          <FormCatInformations
            handleReturnClick={handleReturnButton}
            nameValue={nameValue}
            handleNameValue={handleNameValue}
            pseudoValue={pseudoValue}
            handlePseudoValue={handlePseudoValue}
            ageValue={ageValue}
            handleAgeValue={handleAgeValue}
            colorValue={colorValue}
            handleColorValue={handleColorValue}
            sexeValue={sexeValue}
            handleSexeValue={handleSexeValue}
            catBreedsValue={catBreedsValue}
            handleCatBreedsValue={handleCatBreedsValue}
            likesPets={likesPets}
            handleLikesPets={handleLikesPets}
            likesKids={likesKids}
            handleLikesKids={handleLikesKids}
            needsGarden={needsGarden}
            handleNeedsGarden={handleNeedsGarden}
            contentValue={contentValue}
            handleContentValue={handleContentValue}
            handleSubmitForm={handleSubmitForm}
          />
        )}
    </>
  );
}

FormCatCheckbox.propTypes = {
  nameValue: propTypes.string.isRequired,
  handleNameValue: propTypes.func.isRequired,
  pseudoValue: propTypes.string.isRequired,
  handlePseudoValue: propTypes.func.isRequired,
  ageValue: propTypes.oneOfType([
    propTypes.number,
    propTypes.string,
  ]).isRequired,
  handleAgeValue: propTypes.func.isRequired,
  colorValue: propTypes.string.isRequired,
  handleColorValue: propTypes.func.isRequired,
  catBreedsValue: propTypes.string.isRequired,
  handleCatBreedsValue: propTypes.func.isRequired,
  sexeValue: propTypes.string.isRequired,
  handleSexeValue: propTypes.func.isRequired,
  likesPets: propTypes.string.isRequired,
  handleLikesPets: propTypes.func.isRequired,
  likesKids: propTypes.string.isRequired,
  handleLikesKids: propTypes.func.isRequired,
  needsGarden: propTypes.string.isRequired,
  handleNeedsGarden: propTypes.func.isRequired,
  contentValue: propTypes.string.isRequired,
  handleContentValue: propTypes.func.isRequired,
  handleSubmitForm: propTypes.func.isRequired,
};

export default React.memo(FormCatCheckbox);
