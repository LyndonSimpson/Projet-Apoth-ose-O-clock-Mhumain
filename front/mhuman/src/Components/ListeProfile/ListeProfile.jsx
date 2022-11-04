import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MobileNav from '../Header/MobileNav/MobileNav';
import ListeCard from './ListeCard/ListeCard';

import './listeprofile.scss';

function ListeProfile() {
  return (
    <div className="listeProfile">
      <Header />
      <section className="liste-content">
        <div className="list-card-container">
          <ListeCard />
          <ListeCard />
          <ListeCard />
          <ListeCard />
          <ListeCard />
        </div>
      </section>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default React.memo(ListeProfile);
