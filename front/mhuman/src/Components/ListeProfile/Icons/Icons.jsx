/* eslint-disable import/prefer-default-export */
// Multiple import dans ce fichier !
import React from 'react';
import { Icon } from 'semantic-ui-react';
import './icons.scss';

export function IconNoGarden() {
  return (
    <div>
      <Icon.Group size="large">
        <div className="fixIcon">
          <Icon size="large" color="red" name="ban" />
        </div>
        <Icon size="small" color="green" name="tree" />
      </Icon.Group>
    </div>
  );
}

export function IconGarden() {
  return (
    <div>
      <Icon.Group size="large">
        <div className="fixIcon">
          <Icon size="large" color="green" name="circle outline" />
        </div>
        <Icon size="small" color="black" name="tree" />
      </Icon.Group>
    </div>
  );
}

export function IconNoKid() {
  return (
    <div>
      <Icon.Group size="large">
        <div className="fixIcon">
          <Icon size="large" color="red" name="ban" />
        </div>
        <Icon size="small" color="pink" name="child" />
      </Icon.Group>
    </div>
  );
}

export function IconKid() {
  return (
    <div>
      <Icon.Group size="large">
        <div className="fixIcon">
          <Icon size="large" color="green" name="circle outline" />
        </div>
        <Icon size="small" color="pink" name="child" />
      </Icon.Group>
    </div>
  );
}

export function IconPet() {
  return (
    <div>
      <Icon.Group size="large">
        <div className="fixIcon">
          <Icon size="large" color="green" name="circle outline" />
        </div>
        <Icon size="small" color="black" name="paw" />
      </Icon.Group>
    </div>
  );
}

export function IconNoPet() {
  return (
    <div>
      <Icon.Group size="large">
        <div className="fixIcon">
          <Icon size="large" color="red" name="ban" />
        </div>
        <Icon size="small" color="black" name="paw" />
      </Icon.Group>
    </div>
  );
}
