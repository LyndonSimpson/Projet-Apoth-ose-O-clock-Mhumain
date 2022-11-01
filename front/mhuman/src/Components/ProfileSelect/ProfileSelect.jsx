import React from 'react';
import './profileselect.scss';

import logo from './fakeData/Logo-Mhumain-Colored.png';
import AddProfile from './AddProfile/AddProfile';
import ProfileCard from './ProfileCard/ProfileCard';

function ProfileSelect() {
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
            <AddProfile />
          </div>
        </div>
        <div className="HumainProfile">
          <h1 className="ProfileSubtitle"> Profils Humain</h1>
          <div className="DisplayProfile">
            <AddProfile />
          </div>
        </div>
      </section>
    </div>
  );
}

export default React.memo(ProfileSelect);
