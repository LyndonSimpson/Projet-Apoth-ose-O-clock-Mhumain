import LandingPage from './Components/LandingPage/LandingPage';
import './App.scss';
import LogIn from './Components/LogIn/LogIn';
import SignUp from './Components/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <LandingPage />
      <LogIn />
      <SignUp />
    </div>
  );
}

export default App;
