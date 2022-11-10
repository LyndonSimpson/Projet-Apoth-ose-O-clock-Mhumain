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
  const [modaleProfile, setModaleProfile] = useState({});
  const type = localStorage.getItem('type');

  const toggleProfile = (hasGarden, hasPet, hasKid, name, age, image, race, sexe, color) => {
    setModaleProfile({
      hasGarden,
      hasPet,
      hasKid,
      name,
      age,
      toggleProfile,
      image,
      race,
      sexe,
      color,
    });
    setOpenProfile(!openProfile);
  };

  async function getListProfiles() {
    const [listHumanFetch, listCatFetch] = await Promise.all([
      getAllCatRequest(),
      getAllHumanRequest(),
    ]);
    setCatsProfile(listHumanFetch);
    setHumansProfile(listCatFetch);
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
        <div className="list-card-container">
          {type === 'cat' ? (
            <>
              {humansProfile.map((human) => (
                <ListeCard
                  toggleProfile={toggleProfile}
                  hasGarden={human.has_garden}
                  hasKid={human.has_kids}
                  hasPet={human.has_pets}
                  name={human.name}
                  age={human.age}
                  image={human.image}
                />
              ))}
              {openProfile && (
              <ConsultProfile
                toggleProfile={toggleProfile}
                hasGarden={modaleProfile.has_garden}
                hasKid={modaleProfile.has_kids}
                hasPet={modaleProfile.has_pets}
                name={modaleProfile.name}
                age={modaleProfile.age}
                description={modaleProfile.description}
                image={modaleProfile.image}
              />
              )}
            </>
          )
            : (
              <>
                {catsProfile.map((cat) => (
                  <ListeCard
                    toggleProfile={toggleProfile}
                    hasGarden={cat.needs_garden}
                    hasKid={cat.likes_kids}
                    hasPet={cat.likes_pets}
                    name={cat.name}
                    age={cat.age}
                    image={cat.image}
                  />
                ))}
                {openProfile && (
                <ConsultProfile
                  isCat
                  toggleProfile={toggleProfile}
                  hasGarden={modaleProfile.needs_garden}
                  hasKid={modaleProfile.likes_kids}
                  hasPet={modaleProfile.likes_pets}
                  name={modaleProfile.name}
                  age={modaleProfile.age}
                  description={modaleProfile.description}
                  image={modaleProfile.image}
                  race={modaleProfile.race}
                  color={modaleProfile.color}
                  sexe={modaleProfile.sexe}
                />
                )}
              </>
            )}
        </div>
      </section>
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
