import React, { useEffect, useState } from 'react';

import './profileselect.scss';
import { Link } from 'react-router-dom';
import logo from './fakeData/Logo-Mhumain-Colored.png';
import AddProfile from './AddProfile/AddProfile';
import ProfileCard from './ProfileCard/ProfileCard';
import { catProfilesRequest, humanProfilesRequest } from '../../requests/profilesRequest';

function ProfileSelect() {
  const [catsProfile, setCatsProfile] = useState('');
  const [humansProfile, setHumansProfile] = useState('');

  useEffect(() => { // j'essaye de récupérer les profils de chat et d'humain pour l'utilisateur connecté
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

  return (
    <div className="ProfileSelect">
      <img src={logo} className="ProfileTitle" alt="logo" />
      <section className="ProfileContainer">
        <div className="CatProfile">
          <h1 className="ProfileSubtitle"> Profils Chats</h1>
          <div className="DisplayProfile">

            {catsProfile
              && catsProfile.map(({ pseudo, image, id }) => (
                <ProfileCard
                  key={id}
                  pseudo={pseudo}
                  image={image}
                />
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
                <ProfileCard
                  key={id}
                  pseudo={pseudo}
                  image={image}
                />
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
