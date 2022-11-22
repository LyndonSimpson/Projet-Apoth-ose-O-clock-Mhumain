import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { shape } from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';
import './listecard.scss';
import {
  IconNoGarden,
  IconGarden,
  IconKid,
  IconNoKid,
  IconNoPet,
  IconPet,
} from '../Icons/Icons';

function ListeCard({
  id, hasGarden, hasPet, hasKid, pseudo, age, toggleProfile, image, race, sexe, color, handleAddFav, favorites, handleDeleteFav, description,
}) {
  // Fonction de comparaison pour savoir si un profil fait partie des favoris
  const ProfileIsFavorites = (param) => favorites.some((e) => e.id === param);

  return (
    <Card className="listeCard">
      <Image className="listeCard-img" src={image} wrapped ui={false} />
      <Card.Content className="card-content">
        <Card.Header className="card-header">{pseudo}</Card.Header>
        <Card.Meta>
          <span>
            {age}
            {' '}
            ans
          </span>
        </Card.Meta>
        <Card.Description className="card-icon">
          {hasGarden ? <IconGarden /> : <IconNoGarden />}
          {hasPet ? <IconPet /> : <IconNoPet />}
          {hasKid ? <IconKid /> : <IconNoKid />}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="card-icon-link">
          {ProfileIsFavorites(id) ? (
            <Icon
              className="heartIcon"
              color="red"
              name="heart"
              size="big"
              onClick={() => handleDeleteFav(id)}
            />
          ) : (
            <Icon
              className="listCard-heartIcon"
              name="heart outline"
              size="big"
              onClick={() => handleAddFav(id)}
            />
          )}
          <Link
            to="/chat"
            state={{ pseudo, id }}
          >
            <Icon className="card-icon-link-item" name="mail outline" size="big" />
          </Link>
          <Icon
            className="card-icon-link-item"
            name="expand"
            size="big"
            onClick={() => toggleProfile(hasGarden, hasPet, hasKid, pseudo, age, image, race, sexe, color, description)}
          />
        </div>
      </Card.Content>
    </Card>
  );
}

export default React.memo(ListeCard);

ListeCard.propTypes = {
  toggleProfile: PropTypes.func.isRequired,
  hasGarden: PropTypes.bool.isRequired,
  hasKid: PropTypes.bool.isRequired,
  hasPet: PropTypes.bool.isRequired,
  age: PropTypes.number.isRequired,
  pseudo: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  race: PropTypes.string,
  color: PropTypes.string,
  sexe: PropTypes.string,
  handleAddFav: PropTypes.func.isRequired,
  handleDeleteFav: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  favorites: PropTypes.arrayOf(shape(
    { id: PropTypes.number },
  )),
};

ListeCard.defaultProps = {
  race: '',
  color: '',
  sexe: '',
  favorites: [],
};
