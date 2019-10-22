import React, { useState } from 'react';
import './App.css';
import Game from './components/Game'
import pug from './images/pug.png';

function App() {
  return (
    <div className="body-content">
      <Game />
      <img className="pug" src={pug} />
    </div>
  )
}

export default App
