import React from 'react';
import Proptypes from 'prop-types';
import './miniprofile.scss';
import { Icon } from 'semantic-ui-react';

function Miniprofile({ pseudo, image }) {
  return (
    <div className="miniprofile">
      <div className="align-left">
        <div className="imgRounded">
          <img className="profilePic" src={image} alt="profile" />
        </div>
        <p className="profileName">{pseudo}</p>
      </div>
      <Icon className="heartIcon" name="heart outline" size="big" />
    </div>
  );
}
Miniprofile.propTypes = {
  pseudo: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
};

export default React.memo(Miniprofile);
