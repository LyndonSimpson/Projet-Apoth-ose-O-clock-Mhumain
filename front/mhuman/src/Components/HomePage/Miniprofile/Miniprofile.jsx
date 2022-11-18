import React from 'react';
import Proptypes, { shape } from 'prop-types';
import './miniprofile.scss';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Miniprofile({
  pseudo, image, id, handleAddFav, favorites, handleDeleteFav,
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
        <Link
          to="/chat"
          state={{ pseudo, id }}
        >
          <Icon
            className="mailIcon"
            name="mail outline"
            size="big"
          />
        </Link>
        {ProfileIsFavorites(pseudo) ? (
          <Icon
            className="heartIcon"
            color="red"
            name="heart"
            size="big"
            onClick={() => handleDeleteFav(id)}
          />
        ) : (
          <Icon
            className="heartIcon"
            name="heart outline"
            size="big"
            onClick={() => handleAddFav(id)}
          />
        )}

      </div>
    </div>
  );
}
Miniprofile.propTypes = {
  pseudo: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
  id: Proptypes.number.isRequired,
  handleAddFav: Proptypes.func.isRequired,
  handleDeleteFav: Proptypes.func.isRequired,
  favorites: Proptypes.arrayOf(shape(
    { pseudo: Proptypes.string },
  )),
};
Miniprofile.defaultProps = {
  favorites: [],
};

export default React.memo(Miniprofile);
