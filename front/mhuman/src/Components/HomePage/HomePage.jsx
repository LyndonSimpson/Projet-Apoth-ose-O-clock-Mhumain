import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Miniprofile from './Miniprofile/Miniprofile';
import './homepage.scss';
import MobileNav from './MobileNav/MobileNav';

import { catFavoritesRequest, humanFavoritesRequest } from '../../requests/favoritesRequest';
import { getRandomHumanRequest } from '../../requests/getHumanRequest';
import { getRandomCatRequest } from '../../requests/getCatRequest';
import { setToken } from '../../requests/instance';


const URL = 'https://catfact.ninja/fact';

function HomePage() {
  const [catFact, setCatFact] = useState('');

  const [favorites, setFavorites] = useState([]);
  const [randomProfiles, setRandomProfiles] = useState([]);
  const pseudo = localStorage.getItem('profilePseudo');
  const type = localStorage.getItem('type');

  async function getCatRandomProfileAndFavorites() {
    const [favoritesProfiles, randomHumanProfiles] = await Promise.all([
      catFavoritesRequest(),
      getRandomHumanRequest(),
    ]);
    setFavorites(favoritesProfiles);
    setRandomProfiles(randomHumanProfiles);
  }

  async function getHumanRandomProfileAndFavorites() {
    const [favoritesProfiles, randomCatProfiles] = await Promise.all([
      humanFavoritesRequest(),
      getRandomCatRequest(),
    ]);
    setFavorites(favoritesProfiles);
    setRandomProfiles(randomCatProfiles);
  }

  useEffect(() => { // J'apelle mes API pour avoir mes données
    setToken(localStorage.getItem('Token'));

    async function getCatFact() {
      const response = await axios.get(URL);
      setCatFact(response.data);
    }

    if (type === 'cat') {
      getCatRandomProfileAndFavorites();
    }
    if (type === 'human') {
      getHumanRandomProfileAndFavorites();
    }

    getCatFact();
    // setInterval(getCatFact, 15000);
  }, []);

  return (
    <div className="homepage">
      <Header />
      <section className="homeContent">

        <h1 className="homeTitle">
          {' '}
          Hello
          {' '}
          {pseudo}
          {' '}
          !
        </h1>
        <section className="leftContent">
          <h3 className="homecontentSubtitle">{type === 'cat' ? 'Des humains !' : 'Des chats'}</h3>
          {randomProfiles.length === 0
            && <p>Les randoms ici</p>}
          {randomProfiles.map((RandomProfile) => (
            <Miniprofile
              key={RandomProfile.id}
              pseudo={RandomProfile.pseudo}
              image={RandomProfile.image}
            />
          ))}
        </section>
        <section className="rightContent">
          <div className="favProfil">
            <h3 className="homecontentSubtitle">Mes favoris</h3>
            {favorites.length === 0
              && <p>Ajouter vos premiers favoris !</p>}
            {favorites.map((fav) => (
              <Miniprofile
                key={fav.id}
                pseudo={fav.pseudo}
                image={fav.image}
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
