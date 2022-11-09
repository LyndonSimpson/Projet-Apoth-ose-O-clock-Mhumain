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
import cat2 from '../ProfileSelect/fakeData/pexels-cat-2.jpg';

import './consultprofile.scss';

function ConsultProfile({
  toggleProfile, isCat, hasGarden, hasPet, hasKid,
}) {
  // FAKE DATA TODO:convertir le string en un true/false
  const isFemale = true;

  return (
    <modal className="consultProfile">
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
          <h1 className="profileTitle"> Profil de **PSEUDO**</h1>
          <header className="consultHeader">
            <div className="consultHeader-icons">
              {hasGarden ? <IconGarden /> : <IconNoGarden />}
              {hasPet ? <IconPet /> : <IconNoPet />}
            </div>
            <div className="consultHeader-imgWrapper">
              <img className="consultHeader-imgWrapper-profilePic" src={cat2} alt="profile" />
            </div>
            <div className="consultHeader-icons">
              {hasKid ? <IconKid /> : <IconNoKid />}
              {isFemale ? <IconFemale /> : <IconMale />}
            </div>
          </header>
          <section className="infoContainer">
            <div className="infoContainer-oneLine">
              <p> Name </p>
              <p> Age </p>
            </div>
            {isCat
              ? (
                <div className="infoContainer-oneLine">
                  <p> Race du chat </p>
                  <p> Couleur du poil </p>
                </div>
              )
              : ''}
            <div className="infoContainer-description">
              <p>Alors là! Permettez-moi de vous dire! Le coup du mystérieux chevalier gaulois solitaire à la rescousse de l’opprimé. Ca fait vraiment bidon comme légende!</p>
            </div>
          </section>
        </div>
      </div>
    </modal>
  );
}

export default React.memo(ConsultProfile);

ConsultProfile.propTypes = {
  toggleProfile: PropTypes.func.isRequired,
  isCat: PropTypes.bool,
  hasGarden: PropTypes.bool.isRequired,
  hasKid: PropTypes.bool.isRequired,
  hasPet: PropTypes.bool.isRequired,
  // sexe: PropTypes.string.isRequired,
  // age: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
};

ConsultProfile.defaultProps = {
  isCat: false,
};
