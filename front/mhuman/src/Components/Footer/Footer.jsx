import React from 'react';

import { Link } from 'react-router-dom';

import './footerstyles.scss';

function Footer() {
  return (

    <footer className="footer">
      <div className="left-link">
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="middle-link">
        <h2>Adopte ton Mhumain</h2>
        <p>2022</p>
      </div>
      <div className="right-link">
        <Link to="/data-policy">Mentions Légales</Link>
        <Link to="/about">A propos</Link>
      </div>
    </footer>

  );
}

export default React.memo(Footer);
