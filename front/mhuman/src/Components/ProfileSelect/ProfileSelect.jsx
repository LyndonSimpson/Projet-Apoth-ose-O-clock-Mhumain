import React, { useEffect, useState } from 'react';

import './profileselect.scss';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import logo from './fakeData/Logo-Mhumain-Colored.png';
import AddProfile from './AddProfile/AddProfile';
import ProfileCard from './ProfileCard/ProfileCard';
import { catProfilesRequest, humanProfilesRequest } from '../../requests/profilesRequest';
import { setToken } from '../../requests/instance';
import { catLoginRequest, humanLoginRequest } from '../../requests/loginRequest';

function ProfileSelect() {
  const [catsProfile, setCatsProfile] = useState('');
  const [humansProfile, setHumansProfile] = useState('');

  useEffect(() => { // j'essaye de récupérer les profils de chat et d'humain pour l'utilisateur connecté
    setToken(localStorage.getItem('Token'));
    async function getUserProfile() {
      try {
        const [userCats, userHumans] = await Promise.all([
          catProfilesRequest(),
          humanProfilesRequest(),

        ]);
        setCatsProfile(userCats);
        setHumansProfile(userHumans);
      } catch (error) {
        console.log(error);
      }
    }
    getUserProfile();
  }, []);

  const handleCatProfileClick = async (pseudo) => {
    try {
      const response = await catLoginRequest(pseudo);
      localStorage.setItem('isLogged', response.logged);
      localStorage.setItem('profilePseudo', response.pseudo);
      localStorage.setItem('type', 'cat');
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleHumanProfileClick = async (pseudo) => {
    try {
      const response = await humanLoginRequest(pseudo);
      localStorage.setItem('isLogged', response.logged);
      localStorage.setItem('profilePseudo', response.pseudo);
      localStorage.setItem('type', 'human');
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="ProfileSelect">
      <img src={logo} className="ProfileTitle" alt="logo" />
      <div className="profile-icons">
        <Link to="/updateuser"><Icon className="profile-icon" name="pencil" size="big" /></Link>
        <Link to="/" onClick={() => localStorage.setItem('Token', '')}><Icon className="profile-icon logout" name="log out" size="big" /></Link>
      </div>
      <section className="ProfileContainer">
        <div className="CatProfile">
          <h1 className="ProfileSubtitle"> Profils Chats</h1>
          <div className="DisplayProfile">

            {catsProfile
              && catsProfile.map(({ pseudo, image, id }) => (
                <Link
                  key={id}
                  to="/homepage"
                  onClick={() => handleCatProfileClick(pseudo)}
                >
                  <ProfileCard
                    key={id}
                    pseudo={pseudo}
                    image={image}
                  />
                </Link>
              ))}

            <Link to="/createprofilecat">
              <AddProfile />
            </Link>
          </div>
        </div>
        <div className="HumainProfile">
          <h1 className="ProfileSubtitle"> Profils Humain</h1>
          <div className="DisplayProfile">

            {humansProfile.length > 0
              ? humansProfile.map(({ pseudo, image, id }) => (
                <Link
                  key={id}
                  to="/homepage"
                  onClick={() => handleHumanProfileClick(pseudo)}
                >
                  <ProfileCard
                    key={id}
                    pseudo={pseudo}
                    image={image}
                  />
                </Link>
              ))
              : (
                <Link to="/createprofilehuman">
                  <AddProfile />
                </Link>
              )}

          </div>
        </div>
      </section>
    </div>
  );
}

export default React.memo(ProfileSelect);
