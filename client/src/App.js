import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import LandingPage from "./components/LandingPage.jsx"
import Home from "./components/Home.jsx"
import { GameCreate } from './components/GameCreate';
import Detail from './components/Detail.jsx'
import NotFound from './components/NotFound.jsx';
import './style/landing.css'
import './style/paged.css'
import './style/card.css'
import './style/loader.css'
import './style/home.css'
import './style/searchbar.css'
import './style/detail.css'
import './style/create.css'
import './style/notfound.css'



function App() {
  return (
    
    <Router>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>   
          <Route path='/videogame' element={<GameCreate/>}/>
          <Route path='/videogame/:id' element={<Detail/>}/>
          <Route path={"*" || "/notfound"} element={<NotFound/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
