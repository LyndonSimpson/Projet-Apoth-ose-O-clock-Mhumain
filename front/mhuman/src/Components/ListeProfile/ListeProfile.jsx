import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MobileNav from '../Header/MobileNav/MobileNav';
import ListeCard from './ListeCard/ListeCard';
import ConsultProfile from '../ConsultProfile/ConsultProfile';
import { getAllCatRequest } from '../../requests/getCatRequest';
import { getAllHumanRequest } from '../../requests/getHumanRequest';
import { setToken } from '../../requests/instance';

import './listeprofile.scss';

// // Fake data profile
// const hasGarden = true;
// const hasKid = true;
// const hasPet = true;
// const pseudo = 'Minou';
// const age = '3 ans';

// Props fav pour afficher les favoris au lieu des randoms profils
function ListeProfile({ fav }) {
  const [openProfile, setOpenProfile] = useState(false);
  const [catsProfile, setCatsProfile] = useState([]);
  const [humansProfile, setHumansProfile] = useState([]);
  const type = localStorage.getItem('type');

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
  };

  async function getListProfiles() {
    const [listHumanFetch, listCatFetch] = await Promise.all([
      getAllCatRequest(),
      getAllHumanRequest(),
    ]);
    setCatsProfile(listCatFetch);
    setHumansProfile(listHumanFetch);
  }

  useEffect(() => {
    setToken(localStorage.getItem('Token'));
    getListProfiles();
  }, []);

  return (
    <div className="listeProfile">
      <Header />
      <section className="liste-content">
        <h1 className="listeProfile-title">
          {fav ? 'Vos favoris' : '' }
        </h1>
        {type === 'human' ? (
          humansProfile.map((human) => (
            <div className="list-card-container">
              <ListeCard
                toggleProfile={toggleProfile}
                hasGarden={human.needsGarden}
                hasKid={human.hasKids}
                hasPet={human.hasPets}
                name={human.pseudo}
                age={human.age}
                fileUpload={human.fileUpload}
              />
            </div>
          )))
          : (
            catsProfile.map((cat) => (
              <div className="list-card-container">
                <ListeCard
                  toggleProfile={toggleProfile}
                  hasGarden={cat.needsGarden}
                  hasKid={cat.likesKids}
                  hasPet={cat.likesPets}
                  name={cat.pseudo}
                  age={cat.age}
                  fileUpload={cat.fileUpload}
                />
              </div>
            )))}
      </section>
      {openProfile && <ConsultProfile isCat toggleProfile={toggleProfile} />}
      <Footer />
      <MobileNav />
    </div>
  );
}

export default React.memo(ListeProfile);

ListeProfile.propTypes = {
  fav: PropTypes.bool,
};

ListeProfile.defaultProps = {
  fav: false,
};
