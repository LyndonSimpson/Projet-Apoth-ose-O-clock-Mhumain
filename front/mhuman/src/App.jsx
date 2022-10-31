import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import CreateProfile from './Components/CreateProfile/CreateProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/createprofile"
          element={<CreateProfile />}
        />
      </Routes>
    </div>
  );
}

export default App;
