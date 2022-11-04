import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import LandingPage from './Components/LandingPage/LandingPage';
import ProfileSelect from './Components/ProfileSelect/ProfileSelect';

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
          path="/home"
          element={(
            <>
              <Header />
              <Footer />
            </>
  )}
        />
        <Route
          path="/updateprofile"
          element={<UpdateProfile />}
          end
        />
      </Routes>
    </div>
  );
}

export default App;
