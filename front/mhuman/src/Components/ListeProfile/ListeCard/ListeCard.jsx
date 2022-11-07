import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Image } from 'semantic-ui-react';
import cat2 from '../../ProfileSelect/fakeData/pexels-cat-2.jpg';
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
  hasGarden, hasPet, hasKid, name, age, toggleProfile,
}) {
  return (
    <Card className="listeCard">
      <Image src={cat2} wrapped ui={false} />
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
          <Icon name="heart outline" color="black" size="big" />
          <Icon name="expand" color="black" size="big" onClick={toggleProfile} />
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
};
