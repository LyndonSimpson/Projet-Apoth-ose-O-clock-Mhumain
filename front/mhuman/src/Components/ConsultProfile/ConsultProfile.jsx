/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import {
  IconNoGarden,
  IconGarden,
  IconKid,
  IconNoKid,
  IconNoPet,
  IconPet,
} from '../ListeProfile/Icons/Icons';
import cat2 from '../ProfileSelect/fakeData/pexels-cat-2.jpg';

import './consultprofile.scss';

function ConsultProfile({ toggleProfile }) {
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
            <button type="button" onClick={toggleProfile}>X</button>
          </div>
          <h1 className="profileTitle"> Profil de **PSEUDO**</h1>
          <header className="consultHeader">
            <div className="consultHeader-icons">
              <IconGarden />
              <IconPet />
            </div>
            <div className="consultHeader-imgWrapper">
              <img className="consultHeader-imgWrapper-profilePic" src={cat2} alt="profile" />
            </div>
            <div className="consultHeader-icons">
              <IconKid />
              <IconKid />
            </div>
          </header>
          <section className="infoContainer">
            <div className="infoContainer-oneLine">
              <p> Name </p>
              <p> Age </p>
            </div>
            <div className="infoContainer-oneLine">
              <p> Race du chat </p>
              <p> Couleur du poil </p>
            </div>
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
};
