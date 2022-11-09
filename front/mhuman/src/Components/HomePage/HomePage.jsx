import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Miniprofile from './Miniprofile/Miniprofile';
import './homepage.scss';
import MobileNav from './MobileNav/MobileNav';
import LoginContext from '../../contexts/LoginContext';
import { catFavoritesRequest, humanFavoritesRequest } from '../../requests/favoritesRequest';

const URL = 'https://catfact.ninja/fact';

function HomePage() {
  const [catFact, setCatFact] = useState('');
  const { loginInformation } = useContext(LoginContext);

  useEffect(() => {
    console.log('loginInfo >>>', loginInformation);
    async function getFavorites() {
      let response;
      if (loginInformation.type === 'cat') {
        response = await catFavoritesRequest();
      } else if (loginInformation.type === 'human') {
        response = await humanFavoritesRequest();
      }
      console.log('Response >>>', response);
    }
    async function getCatFact() {
      const response = await axios.get(URL);
      setCatFact(response.data);
    }
    getFavorites();
    getCatFact();
    // setInterval(getCatFact, 15000);
  }, [loginInformation]);

  return (
    <div className="homepage">
      <Header />
      <section className="homeContent">
        <h1 className="homeTitle"> Hello *username* !</h1>
        <section className="leftContent">
          <h3 className="homecontentSubtitle">Des chats ! / Des humains !</h3>
          <Miniprofile />
          <Miniprofile />
          <Miniprofile />
          <Miniprofile />
          <Miniprofile />
        </section>
        <section className="rightContent">
          <div className="randomProfil">
            <h3 className="homecontentSubtitle">Mes favoris</h3>
            <Miniprofile />
            <Miniprofile />
            <Miniprofile />
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
