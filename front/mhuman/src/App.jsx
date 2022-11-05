import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';

import LandingPage from './Components/LandingPage/LandingPage';
import CreateProfile from './Components/CreateProfile/CreateProfile';
import ProfileSelect from './Components/ProfileSelect/ProfileSelect';
import HomePage from './Components/HomePage/HomePage';
import ListeProfile from './Components/ListeProfile/ListeProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage />
          }
        />
        <Route
          path="/homepage"
          element={
            <HomePage />
          }
        />
        <Route
          path="/createprofile"
          element={
            <CreateProfile />
          }
        />
        <Route
          path="/profileselect"
          element={
            <ProfileSelect />
          }
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
      </Routes>
    </div>
  );
}

export default App;
