import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import CreateProfileHuman from './Components/CreateProfileHuman/CreateProfileHuman';
import CreateProfileCat from './Components/CreateProfileCat/CreateProfileCat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/createprofilehuman"
          element={<CreateProfileHuman />}
        />
        <Route
          path="/createprofilecat"
          element={<CreateProfileCat />}
        />
      </Routes>
    </div>
  );
}

export default App;
