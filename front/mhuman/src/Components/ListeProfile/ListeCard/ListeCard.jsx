import React from 'react';
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
  id, hasGarden, hasPet, hasKid, name, age, toggleProfile, image, race, sexe, color, handleAddFav, email, favorites, handleDeleteFav,
}) {
  // Fonction de comparaison pour savoir si un profil fait partie des favoris
  const ProfileIsFavorites = (param) => favorites.some((e) => e.id === param);

  return (
    <Card className="listeCard">
      <Image src={image} wrapped ui={false} />
      <Card.Content className="card-content">
        <Card.Header className="card-header">{name}</Card.Header>
        <Card.Meta>
          <span>
            {age}
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
              className="heartIcon"
              name="heart outline"
              size="big"
              onClick={() => handleAddFav(id)}
            />
          )}
          <a href={`mailto:${email}`}>
            <Icon className="card-icon-link-item" name="mail outline" size="big" />
          </a>
          <Icon
            className="card-icon-link-item"
            name="expand"
            size="big"
            onClick={() => toggleProfile(hasGarden, hasPet, hasKid, name, age, image, race, sexe, color)}
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
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  race: PropTypes.string,
  color: PropTypes.string,
  sexe: PropTypes.string,
  handleAddFav: PropTypes.func.isRequired,
  handleDeleteFav: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
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
