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
import UpdateProfileHuman from './Components/UpdateProfileHuman/UpdateProfileHuman';
import UpdateProfileCat from './Components/UpdateProfileCat/UpdateProfileCat';
import { LoginContextProvider } from './contexts/LoginContext';
import { AddCatProfileContextProvider } from './contexts/AddCatProfileContext';

function App() {
  const [connectedUser, setConnectedUser] = useState('');

  const handleConnectedUser = (obj) => {
    setConnectedUser(obj);
  };

  return (
    <AddCatProfileContextProvider>
      <LoginContextProvider>
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

            {/* La route favprofile est une vue dynamique du composant ListeProfile a qui l'on passe une props fav */}
            <Route
              path="/favprofile"
              element={(
                <ListeProfile fav />
  )}
            />
            <Route
              path="/updateprofilehuman"
              element={<UpdateProfileHuman />}
              end
            />
            <Route
              path="/updateprofilecat"
              element={<UpdateProfileCat />}
              end
            />
          </Routes>
        </div>
      </LoginContextProvider>
    </AddCatProfileContextProvider>
  );
}

export default App;
