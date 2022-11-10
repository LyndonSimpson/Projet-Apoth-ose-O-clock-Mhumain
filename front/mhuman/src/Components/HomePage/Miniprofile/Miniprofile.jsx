import React from 'react';
import Proptypes from 'prop-types';
import './miniprofile.scss';
import { Icon } from 'semantic-ui-react';

function Miniprofile({
  pseudo, image, id, handleClick,
}) {
  return (
    <div className="miniprofile">
      <div className="align-left">
        <div className="imgRounded">
          <img className="profilePic" src={image} alt="profile" />
        </div>
        <p className="profileName">{pseudo}</p>
      </div>
      <Icon
        className="heartIcon"
        name="heart outline"
        size="big"
        onClick={() => handleClick(id)}
      />
    </div>
  );
}
Miniprofile.propTypes = {
  pseudo: Proptypes.string.isRequired,
  image: Proptypes.string.isRequired,
  id: Proptypes.number.isRequired,
  handleClick: Proptypes.func.isRequired,
};

export default React.memo(Miniprofile);
