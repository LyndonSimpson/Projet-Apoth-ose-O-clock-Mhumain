import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';

import LandingPage from './Components/LandingPage/LandingPage';
import ProfileSelect from './Components/ProfileSelect/ProfileSelect';
import HomePage from './Components/HomePage/HomePage';
import ListeProfile from './Components/ListeProfile/ListeProfile';

import CreateProfileHuman from './Components/CreateProfileHuman/CreateProfileHuman';
import CreateProfileCat from './Components/CreateProfileCat/CreateProfileCat';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';

function App() {
  const [connectedUser, setConnectedUser] = useState('');

  const handleConnectedUser = (obj) => {
    setConnectedUser(obj);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={(
            <LandingPage
              handleConnectedUser={handleConnectedUser}
            />
          )}
        />
        <Route
          path="/homepage"
          element={
            <HomePage />
          }
        />
        <Route
          path="/createprofilehuman"
          element={<CreateProfileHuman />}
          end
        />
        <Route
          path="/createprofilecat"
          element={<CreateProfileCat />}
          end
        />
        <Route
          path="/profileselect"
          element={(
            <ProfileSelect
              connectedUser={connectedUser}
            />
          )}
          end
        />
        <Route
          path="/listeprofile"
          element={(
            <ListeProfile />
  )}
        />
<<<<<<< HEAD
        {/* La route favprofile est une vue dynamique du composant ListeProfile a qui l'on passe une props fav */}
        <Route
          path="/favprofile"
          element={(
            <ListeProfile fav />
  )}
=======
        <Route
          path="/updateprofile"
          element={<UpdateProfile />}
          end
>>>>>>> f5277b843fe35e3e6823d5dc44b8da0c52d302e2
        />
      </Routes>
    </div>
  );
}

export default App;
