import React from 'react';
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

function ListeCard() {
  return (
    <Card className="listeCard">
      <Image src={cat2} wrapped ui={false} />
      <Card.Content className="card-content">
        <Card.Header className="card-header">Minou</Card.Header>
        <Card.Meta>
          <span> 1 ans et 6 mois</span>
        </Card.Meta>
        <Card.Description className="card-icon">
          <IconNoGarden />
          <IconNoPet />
          <IconKid />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="card-icon-link">
          <Icon name="heart outline" color="black" size="big" />
          <Icon name="heart outline" color="black" size="big" />
        </div>
      </Card.Content>
    </Card>
  );
}

export default React.memo(ListeCard);
