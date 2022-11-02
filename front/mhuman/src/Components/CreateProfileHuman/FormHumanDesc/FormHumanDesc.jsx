import './formhumandescstyles.scss';
import React, { useState } from 'react';
import {
  Button, TextArea, Icon, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

function FormHumanDesc({
  handleReturnClick,
  contentValue,
  handleContentValue,
  handleSubmitForm,
}) {
  const [image, setImage] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitContent = () => {
    if (!contentValue.trim()) {
      setErrorMessage('Une description est obligatoire');
    }
  };

  const handleDismiss = () => {
    setErrorMessage('');
  };

  return (
    <div>
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
      <form
        className="form-desc-human"
        onSubmit={(e) => { handleSubmitForm(e); }}
      >
        <TextArea
          className="form-desc-human-area"
          rows={2}
          placeholder="Dites-nous en plus sur vous..."
          value={contentValue}
          onChange={(e) => { handleContentValue(e.target.value); }}
        />

        <div>
          {
          Array.from(image).map((item) => (
            <span>
              <img
                style={{ padding: '10px' }}
                width={150}
                height={150}
                src={item ? URL.createObjectURL(item) : null}
                alt="Photos"
              />
            </span>
          ))
        }
          <input
            className="form-desc-human-input"
            onChange={(e) => {
              setImage(e.target.files);
            }}
            multiple
            type="file"
            accept="image/*"
            id="fileUpload"
          />

        </div>

        <div className="form-desc-human-buttons">
          <Button
            className="form-desc-human-button"
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
            className="form-desc-human-button"
            onClick={handleSubmitContent}
            size="big"
            animated="fade"
            type="submit"
          >
            <Button.Content visible>Je veux me faire adopter par un chat!</Button.Content>
            <Button.Content hidden>
              <Icon name="heart" />
            </Button.Content>
          </Button>
        </div>
      </form>

    </div>

  );
}

FormHumanDesc.propTypes = {
  handleReturnClick: PropTypes.func.isRequired,
  contentValue: PropTypes.string.isRequired,
  handleContentValue: PropTypes.func.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
};

export default React.memo(FormHumanDesc);
