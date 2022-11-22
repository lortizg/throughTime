import React, { useState } from 'react';
import './App.css';
import ComponentsPillaPilla from './components/Pilla-pilla/Pilla-pilla'

function App() {
  let contador=0;
  const [currentRender, setCurrentRender] = useState(0);

  const handlePillaPillaClick = () => {
    contador++;
    if(contador===3) {
      setCurrentRender(1);
    }
  }


  const COMPOONENTSTORENDER=[
    <div onClick={handlePillaPillaClick}>
      <ComponentsPillaPilla />
    </div>,
    <p>Hola!</p>
  ];

  
  return (
    COMPOONENTSTORENDER[currentRender]
  );
}

export default App;
