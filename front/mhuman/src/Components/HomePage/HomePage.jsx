import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Miniprofile from './Miniprofile/Miniprofile';
import './homepage.scss';
import MobileNav from './MobileNav/MobileNav';
import {
  addCatFavoritesRequest, addHumanFavoritesRequest, catFavoritesRequest, humanFavoritesRequest,
} from '../../requests/favoritesRequest';
import { getRandomHumanRequest } from '../../requests/getHumanRequest';
import { getRandomCatRequest } from '../../requests/getCatRequest';
import { setToken } from '../../requests/instance';

const URL = 'https://catfact.ninja/fact';

function HomePage() {
  const [catFact, setCatFact] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [randomHumanProfiles, setRandomHumanProfiles] = useState([]);
  const [randomCatProfiles, setRandomCatProfiles] = useState([]);
  const pseudo = localStorage.getItem('profilePseudo');
  const type = localStorage.getItem('type');
  const email = localStorage.getItem('userEmail');

  async function getRandomProfile() {
    try {
      const [randomHumanFetch, randomCatFetch] = await Promise.all([
        getRandomHumanRequest(),
        getRandomCatRequest(),
      ]);
      setRandomHumanProfiles(randomHumanFetch);
      setRandomCatProfiles(randomCatFetch);
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => { // J'apelle mes API pour avoir mes données
    setToken(localStorage.getItem('Token'));
    async function getCatFact() {
      const response = await axios.get(URL);
      setCatFact(response.data);
    }
    getRandomProfile();
    getFavorites();
    getCatFact();
    // setInterval(getCatFact, 15000);
  }, [type]);

  return (
    <div className="homepage">
      <Header
        type={type}
      />
      <section className="homeContent">
        <h1 className="homeTitle">
          {' '}
          Hello
          {' '}
          {pseudo}
          {' '}
          !
        </h1>
        {type === 'human' ? (
          <section className="leftContent">
            <h3 className="homecontentSubtitle">Des chats !</h3>
            {randomCatProfiles.length === 0
            && <p>Les randoms ici</p>}
            {randomCatProfiles.map((randomCat) => (
              <Miniprofile
                key={randomCat.id}
                id={randomCat.id}
                pseudo={randomCat.pseudo}
                image={randomCat.image}
                handleClick={handleHumanAddCatToFavorite}
                email={email}
              />
            ))}
          </section>
        )
          : (
            <section className="leftContent">
              <h3 className="homecontentSubtitle">Des humains !</h3>
              {randomHumanProfiles.length === 0
        && <p>Les randoms ici</p>}
              {randomHumanProfiles.map((randomHuman) => (
                <Miniprofile
                  key={randomHuman.id}
                  id={randomHuman.id}
                  pseudo={randomHuman.pseudo}
                  image={randomHuman.image}
                  handleClick={handleCatAddHumanToFavorite}
                  email={email}
                />
              ))}
            </section>
          )}

        <section className="rightContent">
          <div className="favProfil">
            <h3 className="homecontentSubtitle">Mes favoris</h3>
            {favorites.length === 0
              && <p>Ajouter vos premiers favoris !</p>}
            {favorites.map((fav) => (
              <Miniprofile
                key={fav.id}
                id={fav.id}
                pseudo={fav.pseudo}
                image={fav.image}
                email={email}
              />
            ))}
          </div>
          <div className="factApi">
            <h2 className="factApi--title"> Le Cat Fact :</h2>
            <p className="factApi--content">
              {catFact.fact}
            </p>
          </div>
        </section>
      </section>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default React.memo(HomePage);
