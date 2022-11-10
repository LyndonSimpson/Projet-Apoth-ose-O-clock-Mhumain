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
  const [catsProfile, setCatsProfile] = useState('');
  const [humansProfile, setHumansProfile] = useState('');

  const toggleProfile = () => {
    setOpenProfile(!openProfile);
  };

  useEffect(() => { // j'essaye de récupérer les profils de chat et d'humain pour l'utilisateur connecté
    setToken(localStorage.getItem('Token'));
    async function getListProfiles() {
      try {
        const [listCats, listHumans] = await Promise.all([
          getAllCatRequest(),
          getAllHumanRequest(),

        ]);
        setCatsProfile(listCats);
        setHumansProfile(listHumans);
      } catch (error) {
        console.log(error);
      }
    }
    getListProfiles();
  }, []);

  return (
    <div className="listeProfile">
      <Header />
      <section className="liste-content">
        <h1 className="listeProfile-title">{fav ? 'Vos favoris:' : 'Oh des profils de chats !'}</h1>
        <div className="list-card-container">
          { localStorage.getItem('type') === 'cat' && catsProfile.map(({
            age, pseudo, likesPets, likesKids, needsGarden, fileUpload,
          }) => (
            <ListeCard
              toggleProfile={toggleProfile}
              hasGarden={needsGarden}
              hasKid={likesKids}
              hasPet={likesPets}
              name={pseudo}
              age={age}
              fileUpload={fileUpload}
            />
          ))}

          { localStorage.getItem('type') === 'human' && humansProfile.map(({
            age, pseudo, hasPets, hasKids, hasGarden, fileUpload,
          }) => (
            <ListeCard
              toggleProfile={toggleProfile}
              hasGarden={hasGarden}
              hasKid={hasKids}
              hasPet={hasPets}
              name={pseudo}
              age={age}
              fileUpload={fileUpload}
            />
          ))}
        </div>
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
