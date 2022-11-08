import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import './mobilenav.scss';

function MobileNav() {
  return (
    <div className="mobilenav-icon">
      <Link to="/search"><Icon name="search" size="big" /></Link>
      <Link to="/fav"><Icon name="heart outline" size="big" /></Link>
      <Link to="/profil"><Icon name="user" size="big" /></Link>
    </div>
  );
}

export default React.memo(MobileNav);
