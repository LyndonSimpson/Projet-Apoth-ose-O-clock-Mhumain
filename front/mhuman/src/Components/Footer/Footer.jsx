import React from 'react';

import { Link } from 'react-router-dom';

import './footerstyles.scss';

function Footer() {
  return (

    <footer className="footer">
      <div className="left-link">
        <Link className="link-white" to="/faq">FAQ</Link>
        <a className="link-white" href="mailto:contact@mhumain.fr">contact@mhumain.fr</a>
      </div>
      <div className="middle-link">
        <h2>Adopte ton Mhumain</h2>
        <p>2022</p>
      </div>
      <div className="right-link">
        <Link className="link-white" to="/data-policy">Mentions Légales</Link>
        <Link className="link-white" to="/about">A propos</Link>
      </div>
    </footer>

  );
}

export default React.memo(Footer);
