import React from 'react'
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './Components/Footer';
import Teamlead from './Pages/Teamlead';
import Frontendlead from './Pages/Frontendlead';
import Backendlead from './Pages/Backendlead';
import Scrummaster from './Pages/Scrummaster';
import Github from './Pages/Github';
// import { Github } from '@mui/icons-material';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
        <Route path='/' exact Component = {Home}/>
        <Route path='/about' exact Component = {About}/>
        <Route path='/about/teamlead' exact Component = {Teamlead}/>
        <Route path='/about/frontendlead' exact Component={Frontendlead}/>
        <Route path='/about/backendlead' exact Component={Backendlead}/>
        <Route path='/about/github' exact Component={Github}/>
        <Route path='/about/scrummaster' exact Component={Scrummaster}/>
      </Routes>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
