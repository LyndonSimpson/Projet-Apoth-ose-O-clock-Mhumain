/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import {
  IconNoGarden,
  IconGarden,
  IconKid,
  IconNoKid,
  IconNoPet,
  IconPet,
  IconMale,
  IconFemale,
} from '../ListeProfile/Icons/Icons';

import './consultprofile.scss';

function ConsultProfile({
  toggleProfile,
  isCat,
  hasGarden,
  hasPet,
  hasKid,
  name,
  age,
  description,
  image,
  race,
  color,
  sexe,
}) {
  let isFemale;
  if (sexe === 'femelle') {
    isFemale = true;
  } else {
    isFemale = false;
    console.log('SEXE IN CONSULTPROFILE >>>>>>>>>>>', sexe);
  }

  return (
    <section className="consultProfile">
      <div
        className="click-background"
        onClick={toggleProfile}
      >
        <div
          className="profil-content"
          onClick={(e) => {
          // Pour eviter la fermeture de la modale au click dans cette div
            e.stopPropagation();
          }}
        >
          <div className="displayClosingButton">
            <Icon className="displayClosingButton-item" size="big" color="black" name="close" onClick={toggleProfile} />
          </div>
          <h1 className="profileTitle">
            {' '}
            Profil de
            {' '}
            {name}
          </h1>
          <header className="consultHeader">
            <div className="consultHeader-icons">
              {hasGarden ? <IconGarden /> : <IconNoGarden />}
              {hasPet ? <IconPet /> : <IconNoPet />}
            </div>
            <div className="consultHeader-imgWrapper">
              <img className="consultHeader-imgWrapper-profilePic" src={image} alt="profile" />
            </div>
            <div className="consultHeader-icons">
              {hasKid ? <IconKid /> : <IconNoKid />}
              {isFemale ? <IconFemale /> : <IconMale />}
            </div>
          </header>
          <section className="infoContainer">
            <div className="infoContainer-oneLine">
              <p>{name}</p>
              <p>
                {age}
                {' '}
                ans
                {' '}
              </p>
            </div>
            {isCat
              ? (
                <div className="infoContainer-oneLine">
                  <p>{race}</p>
                  <p>{color}</p>
                </div>
              )
              : ''}
            <div className="infoContainer-description">
              <p>{description}</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default React.memo(ConsultProfile);

ConsultProfile.propTypes = {
  toggleProfile: PropTypes.func.isRequired,
  isCat: PropTypes.bool,
  hasGarden: PropTypes.bool.isRequired,
  hasKid: PropTypes.bool.isRequired,
  hasPet: PropTypes.bool.isRequired,
  sexe: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  race: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

ConsultProfile.defaultProps = {
  isCat: false,
};
