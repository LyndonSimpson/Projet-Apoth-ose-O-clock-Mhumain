import React from 'react';

import { Link } from 'react-router-dom';

import './notfound.scss';

function NotFound() {
  return (

    <section className="notFound">
      <p>404</p>
    </section>

  );
}

export default React.memo(NotFound);
