import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Logo from './logo.png';
import videoCat from '../../videos/catvideo-head.mp4';
import './notfound.scss';

function NotFound() {
  return (
    <div className="notfound">
      <video
        autoPlay
        muted
        loop
        id="background-video-404"
      >
        <source src={videoCat} />
      </video>
      <section className="notfound-container">
        <div className="notfound-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="notfound-text">
          <h1 className="notfound-title">404</h1>
          <h2>Mia'oups ! !</h2>
          <h2>La page que vous cherchez n'a pas l'air d'être ici !</h2>
          <div className="notfound-linkwrapper">
            <Link
              to="/"
              className="notfound-link"
            >
              <p> Retourner à la page d'accueil </p>
            </Link>
            <Link
              to="/"
              className="notfound-link"
            >
              <Icon name="sign-in alternate" color="white" size="big" />
            </Link>
          </div>
        </div>

      </section>
    </div>

  );
}

export default React.memo(NotFound);
