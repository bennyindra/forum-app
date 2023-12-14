import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainScreen from './container/main-screen/MainScreen';

function App() {

  return (
      <Routes>
        <Route path='/' Component={MainScreen}/>
        {/* <Route path='/' Component={MainScreen}/> */}
      </Routes>
  );
}

export default App;
