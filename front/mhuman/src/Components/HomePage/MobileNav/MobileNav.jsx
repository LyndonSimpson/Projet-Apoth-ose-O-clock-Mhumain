import React from 'react';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import './mobilenav.scss';

function MobileNav({ type }) {
  return (
    <div className="mobilenav-icon">
      <Link to="/listeprofile"><Icon name="search" size="big" /></Link>
      <Link to="/favprofile"><Icon name="heart outline" size="big" /></Link>
      <Link to={type === 'cat' ? '/updateprofilecat' : '/updateprofilehuman'}><Icon name="pencil" size="big" /></Link>
      <Link to="/profileselect"><Icon name="user" size="big" /></Link>
    </div>
  );
}

MobileNav.propTypes = {
  type: Proptypes.string,
};

MobileNav.defaultProps = {
  type: 'cat',
};

export default React.memo(MobileNav);
