import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import LoginContext from '../../contexts/LoginContext';

import './headerstyles.scss';

function Header() {
  const { loginInformation } = useContext(LoginContext);

  return (
    <header className="header">
      <Link to="/search"><img className="logo" src="logo.png" alt="logo adopte ton mhumains" /></Link>
      <div className="nav-icon">
        <Link to="/search"><Icon name="search" size="big" /></Link>
        <Link to="/fav"><Icon name="heart outline" size="big" /></Link>
        <Link to={loginInformation.type === 'cat' ? '/updateprofilecat' : '/updateprofilehuman'}><Icon name="user" size="big" /></Link>
      </div>
    </header>
  );
}
export default React.memo(Header);
