import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './profileselect.scss';
import { Link } from 'react-router-dom';
import logo from './fakeData/Logo-Mhumain-Colored.png';
import AddProfile from './AddProfile/AddProfile';
import ProfileCard from './ProfileCard/ProfileCard';

function ProfileSelect({
  connectedUser,
}) {
  const [catsProfile, setCatsProfile] = useState('');
  const [humansProfile, setHumansProfile] = useState('');

  useEffect(() => { // j'essaye de récupérer les profils de chat et d'humain pour l'utilisateur connecté
    async function getUserProfile() {
      console.log(connectedUser);
      try {
        const [userCats, userHumans] = await Promise.all([
          axios.get('http://localhost:3001/usercats', {
            withCredentials: true,
          }),
          axios.get('http://localhost:3001/userhumans', {
            withCredentials: true,
          }),
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
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <Link to="/createprofilecat">
              <AddProfile />
            </Link>
          </div>
        </div>
        <div className="HumainProfile">
          <h1 className="ProfileSubtitle"> Profils Humain</h1>
          <div className="DisplayProfile">
            <Link to="/createprofilehuman">
              <AddProfile />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

ProfileSelect.propTypes = {
  connectedUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isAdmin: PropTypes.bool,
  }).isRequired,
};

export default React.memo(ProfileSelect);
