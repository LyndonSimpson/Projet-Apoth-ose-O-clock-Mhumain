import './formcatdescstyles.scss';
import React, { useState } from 'react';
import {
  Button, TextArea, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LandingPage from '../../LandingPage/LandingPage';

function FormCatDesc({
  handleReturnClick,
}) {
  const [next, setNext] = useState('');
  const [image, setImage] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setNext('LandingPage');
  };

  return (
    <div>
      {!next && (
      <form className="form-desc-cat">
        <TextArea className="form-desc-cat-area" rows={2} placeholder="Dites-nous en plus sur vous..." />

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
            className="form-desc-cat-input"
            onChange={(e) => {
              setImage(e.target.files);
            }}
            multiple
            type="file"
            accept="image/*"
            id="fileUpload"
          />

        </div>

        <div className="form-desc-cat-buttons">
          <Button
            className="form-desc-cat-button"
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
            className="form-desc-cat-button"
            onClick={handleReturnClick}
            size="big"
            animated="fade"
          >
            <Button.Content visible>Je veux me faire adopter par un chat!</Button.Content>
            <Button.Content hidden>
              <Icon name="heart" />
            </Button.Content>
          </Button>
        </div>
      </form>
      )}
      {next === 'LandingPage'
    && (
      <LandingPage />
    )}
    </div>

  );
}

FormCatDesc.propTypes = {
  handleReturnClick: PropTypes.func.isRequired,
};

export default React.memo(FormCatDesc);
