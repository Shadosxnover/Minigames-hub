import React from 'react';
import './output.css';
import Home from './home';
import Minigame1 from './higher_or_lower';
import Minigame2 from './tic-tac-toe';
import Minigame3 from './typing-test';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/minigame1" element={<Minigame1 />} />
          <Route path="/minigame2" element={<Minigame2 />} />
          <Route path="/minigame3" element={<Minigame3 />} />
        </Routes>
      </BrowserRouter>
      {/* <Minigame1 /> */}
      {/* <Minigame2 /> */}
      {/* <Home /> */}
    </div>
  );
}

export default App;
