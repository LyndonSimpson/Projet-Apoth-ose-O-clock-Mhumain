import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';

import LandingPage from './Components/LandingPage/LandingPage';
import ProfileSelect from './Components/ProfileSelect/ProfileSelect';
import HomePage from './Components/HomePage/HomePage';
import ListeProfile from './Components/ListeProfile/ListeProfile';
import NotFound from './Components/NotFound/NotFound';
import Chat from './Components/Chat/Chat';
import CreateProfileHuman from './Components/CreateProfileHuman/CreateProfileHuman';
import CreateProfileCat from './Components/CreateProfileCat/CreateProfileCat';
import UpdateProfileHuman from './Components/UpdateProfileHuman/UpdateProfileHuman';
import UpdateProfileCat from './Components/UpdateProfileCat/UpdateProfileCat';
import UpdateProfileUser from './Components/UpdateProfileUser/UpdateProfileUser';
import ForgotPassword from './Components/LandingPage/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/LandingPage/ResetPassword/ResetPassword';
import Conversations from './Components/Conversations/Conversations';
import { LoginContextProvider } from './contexts/LoginContext';
import { AddCatProfileContextProvider } from './contexts/AddCatProfileContext';
import { AddHumanProfileContextProvider } from './contexts/AddHumanProfileContext';
import About from './Components/About/About';
import FAQ from './Components/FAQ/FAQ';
import DataPolicy from './Components/DataPolicy/DataPolicy';

function App() {
  return (
    <AddHumanProfileContextProvider>
      <AddCatProfileContextProvider>
        <LoginContextProvider>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={(
                  <LandingPage />
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
                  <ProfileSelect />
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
              <Route
                path="/forgotpassword"
                element={<ForgotPassword />}
                end
              />
              <Route
                path="/:id/:token"
                element={<ResetPassword />}
                end
              />
              <Route
                path="/updateuser"
                element={<UpdateProfileUser />}
                end
              />
              <Route
                path="*"
                element={<NotFound />}
              />
              <Route
                path="/about"
                element={<About />}
                end
              />
              <Route
                path="/faq"
                element={<FAQ />}
                end
              />
              <Route
                path="/chat"
                element={<Chat />}
                end
              />
              <Route
                path="/messages"
                element={<Conversations />}
                end
              />
              <Route
                path="/data-policy"
                element={<DataPolicy />}
                end
              />
            </Routes>
          </div>
        </LoginContextProvider>
      </AddCatProfileContextProvider>
    </AddHumanProfileContextProvider>
  );
}

export default App;
