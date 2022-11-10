import React from 'react';
import Proptypes from 'prop-types';
import './miniprofile.scss';
import { Icon } from 'semantic-ui-react';

function Miniprofile({
  pseudo, image, id, handleClick, email,
}) {
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
};

export default React.memo(Miniprofile);
