import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Landing from './Landing';
import Addposts from './AddPosts';
import Showposts from './ShowPosts';


function App() {
  const [status, setStatus] = useState('');
  function checkInit(isReady){
    if (isReady) setStatus('true');
    else setStatus('false');
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Router>
            <Routes>
              <Route exact path='/' element={< Landing update = {checkInit} />} />
              <Route path='/AddPosts' element={ < Addposts /> } />
              <Route path='ShowPosts' element={ < Showposts /> } />
            </Routes>
            <p>Server initiated: {status}</p>
            <Link to="/AddPosts"> <button> Add Posts </button> </Link>
            <Link to="/Showposts"> <button> Show Posts </button> </Link>
            <Link to='/'> <button> Landing Page </button> </Link>
          </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
