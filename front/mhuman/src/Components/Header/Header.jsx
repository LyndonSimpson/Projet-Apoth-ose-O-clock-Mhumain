import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import './headerstyles.scss';

function Header({ type }) {
  return (
    <header className="header">
      <Link to="/homepage"><img className="logo" src="logo.png" alt="logo adopte ton mhumains" /></Link>
      <div className="nav-icon">
        <Link to="/listeprofile"><Icon name="search" size="big" /></Link>
        <Link to="/favprofile"><Icon name="heart outline" size="big" /></Link>
        <Link to="/messages"><Icon name="mail outline" size="big" /></Link>
        <Link to={type === 'cat' ? '/updateprofilecat' : '/updateprofilehuman'}><Icon name="pencil" size="big" /></Link>
        <Link to="/profileselect"><Icon name="user" size="big" /></Link>
      </div>
    </header>
  );
}
Header.propTypes = {
  type: Proptypes.string,
};

Header.defaultProps = {
  type: 'cat',
};
export default React.memo(Header);
