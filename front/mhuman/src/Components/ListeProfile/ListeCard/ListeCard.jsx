import React from 'react';
import PropTypes from 'prop-types';
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
  hasGarden, hasPet, hasKid, name, age, toggleProfile, image, race, sexe, color,
}) {
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
          <Icon className="card-icon-link-item" name="heart outline" size="big" />
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
  age: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  race: PropTypes.string,
  color: PropTypes.string,
  sexe: PropTypes.string,
};

ListeCard.defaultProps = {
  race: '',
  color: '',
  sexe: '',
};
