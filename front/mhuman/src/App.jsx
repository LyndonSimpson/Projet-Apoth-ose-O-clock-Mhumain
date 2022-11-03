import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import LandingPage from './Components/LandingPage/LandingPage';
import CreateProfile from './Components/CreateProfile/CreateProfile';
import ProfileSelect from './Components/ProfileSelect/ProfileSelect';
import HomePage from './Components/HomePage/HomePage';

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
          path="/home"
          element={(
            <>
              <Header />
              <Footer />
            </>
  )}
        />
      </Routes>
    </div>
  );
}

export default App;
