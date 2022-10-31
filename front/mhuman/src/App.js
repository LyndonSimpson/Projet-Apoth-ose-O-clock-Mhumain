import 'semantic-ui-css/semantic.min.css'
import './App.scss';
import ProfileSelect from './Components/ProfileSelect/ProfileSelect';
import LandingPage from './Components/LandingPage/LandingPage'
import { Route , Routes } from 'react-router-dom'

function App() {
  return (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/profileselect" element={<ProfileSelect />} />
    <Route path="*" element={<p>not found bro</p>} />
  </Routes>
  );
}

export default App;
