import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import './headerstyles.scss';

function Header() {
  return (
    <header className="header">
      <Link to="/search"><img className="logo" src="logo.png" alt="logo adopte ton mhumains" /></Link>
      <div className="nav-icon">
        <Link to="/search"><Icon name="search" size="big" /></Link>
        <Link to="/fav"><Icon name="heart outline" size="big" /></Link>
        <Link to="/profil"><Icon name="user" size="big" /></Link>
      </div>
    </header>
  );
}
export default React.memo(Header);
