import React from 'react';
import './miniprofile.scss';
import { Icon } from 'semantic-ui-react';
import cat2 from '../../ProfileSelect/fakeData/pexels-cat-1.jpg';

function Miniprofile() {
  return (
    <div className="miniprofile">
      <div className="align-left">
        <div className="imgRounded">
          <img className="profilePic" src={cat2} alt="profile" />
        </div>
        <p className="profileName">Minou Le Chat</p>
      </div>
      <Icon className="heartIcon" name="heart outline" size="big" />
    </div>
  );
}

export default React.memo(Miniprofile);
