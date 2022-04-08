import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import LandingPage from "./components/LandingPage.jsx"
import Home from "./components/Home.jsx"
import { GameCreate } from './components/GameCreate';
import Detail from './components/Detail.jsx'
import './style/landing.css'
import './style/paged.css'
import './style/card.css'
import './style/loader.css'

function App() {
  return (
    
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>   
          <Route path='/videogame' element={<GameCreate/>}/>
          <Route path='/videogame/:id' element={<Detail/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
