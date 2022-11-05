import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MobileNav from '../Header/MobileNav/MobileNav';
import ListeCard from './ListeCard/ListeCard';

import './listeprofile.scss';

// Fake data profile
const hasGarden = true;
const hasKid = true;
const hasPet = true;
const pseudo = 'Minou';
const age = '3 ans';

// Props fav pour afficher les favoris au lieu des randoms profils
function ListeProfile({ fav }) {
  return (
    <div className="listeProfile">
      <Header />
      <section className="liste-content">
        <h1 className="listeProfile-title">{fav ? 'Vos favoris:' : 'Oh des profils de chats !'}</h1>
        <div className="list-card-container">
          <ListeCard
            hasGarden={hasGarden}
            hasKid={hasKid}
            hasPet={hasPet}
            name={pseudo}
            age={age}
          />
        </div>
      </section>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default React.memo(ListeProfile);

ListeProfile.propTypes = {
  fav: PropTypes.bool.isRequired,
};
