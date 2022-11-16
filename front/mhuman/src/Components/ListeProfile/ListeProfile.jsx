import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MobileNav from '../Header/MobileNav/MobileNav';
import ListeCard from './ListeCard/ListeCard';
import ConsultProfile from '../ConsultProfile/ConsultProfile';
import { getAllCatRequest } from '../../requests/getCatRequest';
import { getAllHumanRequest } from '../../requests/getHumanRequest';
import { setToken } from '../../requests/instance';
import {
  catFavoritesRequest, humanFavoritesRequest, addCatFavoritesRequest,
  addHumanFavoritesRequest, deleteHumanFavoritesRequest, deleteCatFavoritesRequest,
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
  const Token = localStorage.getItem('Token');

  const toggleProfile = (hasGarden, hasPet, hasKid, pseudo, age, image, race, sexe, color, description) => {
    setModaleProfile({
      hasGarden,
      hasPet,
      hasKid,
      pseudo,
      age,
      toggleProfile,
      image,
      race,
      sexe,
      color,
      description,
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

  // Fonctions pour delete un favoris
  const handleDeleteFav = async (unlikedId) => {
    if (type === 'cat') {
      await deleteHumanFavoritesRequest(unlikedId);
    } else {
      await deleteCatFavoritesRequest(unlikedId);
    }
    getFavorites();
  };

  const handleHumanAddCatToFavorite = async (likedId) => {
    await addCatFavoritesRequest(likedId);
    getFavorites();
  };

  const handleCatAddHumanToFavorite = async (likedId) => {
    await addHumanFavoritesRequest(likedId);
    getFavorites();
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
  // console.log('LOG >>>>', modaleProfile);
  // console.log('HUMAN PROFILE>>>>', humansProfile);
  // console.log('CAT PROFILE >>>>', catsProfile); modaleProfile.needs_garden

  return (
    <div className="listeProfile">
      <Header
        type={type}
      />
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
                    key={human.id}
                    favorites={favorites}
                    toggleProfile={toggleProfile}
                    description={human.description}
                    hasGarden={human.has_garden}
                    hasKid={human.has_kids}
                    hasPet={human.has_pets}
                    pseudo={human.pseudo}
                    age={human.age}
                    image={human.image}
                    id={human.id}
                    email={email}
                    handleAddFav={handleCatAddHumanToFavorite}
                    handleDeleteFav={handleDeleteFav}
                  />
                ))}
                {openProfile && (
                <ConsultProfile
                  toggleProfile={toggleProfile}
                  hasGarden={modaleProfile.hasGarden}
                  hasKid={modaleProfile.hasKids}
                  hasPet={modaleProfile.hasPets}
                  pseudo={modaleProfile.pseudo}
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
                      key={cat.id}
                      favorites={favorites}
                      toggleProfile={toggleProfile}
                      description={cat.description}
                      hasGarden={cat.needs_garden}
                      hasKid={cat.likes_kids}
                      hasPet={cat.likes_pets}
                      pseudo={cat.pseudo}
                      age={cat.age}
                      image={cat.image}
                      id={cat.id}
                      email={email}
                      sexe={cat.sexe}
                      color={cat.color}
                      race={cat.race}
                      handleAddFav={handleHumanAddCatToFavorite}
                      handleDeleteFav={handleDeleteFav}
                    />
                  ))}
                  {openProfile && (
                  <ConsultProfile
                    isCat
                    toggleProfile={toggleProfile}
                    has_garden={modaleProfile.has_garden}
                    hasKid={modaleProfile.hasKid}
                    hasPet={modaleProfile.hasPet}
                    pseudo={modaleProfile.pseudo}
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
                    favorites={favorites}
                    has_garden={favorite.has_garden}
                    hasKid={favorite.has_kids}
                    hasPet={favorite.has_pets}
                    pseudo={favorite.pseudo}
                    age={favorite.age}
                    image={favorite.image}
                    key={favorite.id}
                    id={favorite.id}
                    email={email}
                    handleDeleteFav={handleDeleteFav}
                    description={favorite.description}
                  />
                ))}
                {openProfile && (
                <ConsultProfile
                  toggleProfile={toggleProfile}
                  hasGarden={modaleProfile.hasGarden}
                  hasKid={modaleProfile.hasKid}
                  hasPet={modaleProfile.hasPet}
                  pseudo={modaleProfile.pseudo}
                  age={modaleProfile.age}
                  description={modaleProfile.description}
                  image={modaleProfile.image}
                  color={modaleProfile.color}
                  sexe={modaleProfile.sexe}
                />
                )}
              </>
            )
              : (
                <>
                  {favorites.map((favorite) => (
                    <ListeCard
                      key={favorite.id}
                      favorites={favorites}
                      toggleProfile={toggleProfile}
                      has_garden={favorite.needs_garden}
                      hasKid={favorite.likes_kids}
                      hasPet={favorite.likes_pets}
                      pseudo={favorite.pseudo}
                      age={favorite.age}
                      image={favorite.image}
                      id={favorite.id}
                      email={email}
                      handleDeleteFav={handleDeleteFav}
                      sexe={favorite.sexe}
                      description={favorite.description}
                      race={favorite.race}
                      color={favorite.color}
                    />
                  ))}
                  {openProfile && (
                  <ConsultProfile
                    isCat
                    toggleProfile={toggleProfile}
                    hasGarden={modaleProfile.hasGarden}
                    hasKid={modaleProfile.hasKid}
                    hasPet={modaleProfile.hasPet}
                    pseudo={modaleProfile.pseudo}
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
      <MobileNav
        type={type}
      />
      {!Token && (
        <Navigate to="/" />
      )}
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
