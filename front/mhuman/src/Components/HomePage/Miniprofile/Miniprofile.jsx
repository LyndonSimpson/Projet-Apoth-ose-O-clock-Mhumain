import React from 'react';
import Proptypes, { shape } from 'prop-types';
import './miniprofile.scss';
import { Icon } from 'semantic-ui-react';

function Miniprofile({
  pseudo, image, id, handleClick, favorites, email,
}) {
  // Fonction de comparaison pour savoir si un profil fait partie des favoris
  const ProfileIsFavorites = (param) => favorites.some((e) => e.pseudo === param);

  return (
    <div className="miniprofile">
      <div className="align-left">
        <div className="imgRounded">
          <img className="profilePic" src={image} alt="profile" />
        </div>
        <p className="profileName">{pseudo}</p>
      </div>
      <div className="bloc-icons">
        <a href={`mailto:${email}`}>
          <Icon className="mail" name="mail outline" size="big" />
        </a>
        <Icon
          className="heartIcon"
          color={ProfileIsFavorites(pseudo) ? 'red' : ''}
          name={ProfileIsFavorites(pseudo) ? 'heart' : 'heart outline'}
          name="heart outline"
          size="big"
          onClick={() => handleClick(id)}
        />
      </div>
    </div>
  );
}
Miniprofile.propTypes = {
  pseudo: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
  id: Proptypes.number.isRequired,
  handleClick: Proptypes.func.isRequired,
  email: Proptypes.string.isRequired,
  favorites: Proptypes.arrayOf(shape(
    { pseudo: Proptypes.string },
  )),
};
Miniprofile.defaultProps = {
  favorites: [],
};

export default React.memo(Miniprofile);
