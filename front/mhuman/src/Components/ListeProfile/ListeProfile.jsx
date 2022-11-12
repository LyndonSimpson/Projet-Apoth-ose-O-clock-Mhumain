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
import {
  catFavoritesRequest, humanFavoritesRequest, addCatFavoritesRequest, addHumanFavoritesRequest,
} from '../../requests/favoritesRequest';

import './listeprofile.scss';

// Props fav pour afficher les favoris au lieu des randoms profils
function ListeProfile({ fav }) {
  const [openProfile, setOpenProfile] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [catsProfile, setCatsProfile] = useState([]);
  const [humansProfile, setHumansProfile] = useState([]);
  const [modaleProfile, setModaleProfile] = useState({});
  const type = localStorage.getItem('type');
  const email = localStorage.getItem('userEmail');

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

  async function getFavorites() {
    try {
      if (type === 'cat') {
        const response = await catFavoritesRequest();
        setFavorites(response);
      } else {
        const response = await humanFavoritesRequest();
        setFavorites(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleHumanAddCatToFavorite = async (likedId) => {
    console.log(likedId);
    const response = await addCatFavoritesRequest(likedId);
    console.log(response);
  };

  const handleCatAddHumanToFavorite = async (likedId) => {
    console.log(likedId);
    const response = await addHumanFavoritesRequest(likedId);
    console.log(response);
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
    getFavorites();
  }, []);

  return (
    <div className="listeProfile">
      <Header />
      <section className="liste-content">
        <h1 className="listeProfile-title">
          {fav ? 'Vos favoris' : 'Liste des profils' }
        </h1>
        {!fav ? (
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
                    id={human.id}
                    email={email}
                    addFavorite={handleCatAddHumanToFavorite}
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
                      id={cat.id}
                      email={email}
                      addFavorite={handleHumanAddCatToFavorite}
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
        ) : (
          <div className="list-card-container">
            {type === 'cat' ? (
              <>
                {favorites.map((favorite) => (
                  <ListeCard
                    toggleProfile={toggleProfile}
                    hasGarden={favorite.has_garden}
                    hasKid={favorite.has_kids}
                    hasPet={favorite.has_pets}
                    name={favorite.name}
                    age={favorite.age}
                    image={favorite.image}
                    key={favorite.id}
                    id={favorite.id}
                    email={email}
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
                  {favorites.map((favorite) => (
                    <ListeCard
                      toggleProfile={toggleProfile}
                      hasGarden={favorite.needs_garden}
                      hasKid={favorite.likes_kids}
                      hasPet={favorite.likes_pets}
                      name={favorite.name}
                      age={favorite.age}
                      image={favorite.image}
                      email={email}
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
        )}
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
