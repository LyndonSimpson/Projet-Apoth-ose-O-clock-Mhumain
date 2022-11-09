import React from 'react';
import propTypes from 'prop-types';
import './profilecard.scss';

function ProfileCard({
  pseudo,
  image,
}) {
  return (
    <div className="ProfileCard">
      <img src={image} className="ProfilePicture" alt="profils" />
      <p className="ProfileName">{pseudo}</p>
    </div>
  );
}

ProfileCard.propTypes = {
  pseudo: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
};

export default React.memo(ProfileCard);
