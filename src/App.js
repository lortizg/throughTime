import React, { useState } from 'react';
import './App.css';
import ComponentsPillaPilla from './components/Pilla-pilla/Pilla-pilla'
import Break from './components/Break/Break'

function App() {
  // let contadorPillaPilla=0;
  const numPillaPilla=4;
  const numCracks=20;
  const step=250;
  const [currentRender, setCurrentRender] = useState(0);
  const [contadorPillaPilla,setContadorPillaPilla] =useState(0);

  const handlePillaPillaClick = () => {
    setContadorPillaPilla(contadorPillaPilla + 1);
    if(contadorPillaPilla === numPillaPilla) {
      setTimeout(()=>setCurrentRender(1),step*numCracks);
    }
  }


  const COMPONENTSTORENDER=[
    <div onClick={handlePillaPillaClick}>
      <ComponentsPillaPilla />
      <p>{contadorPillaPilla}</p>
      {contadorPillaPilla>=numPillaPilla-1 && <Break numCracks={numCracks} step={step}/>}
    </div>,
    <p>Hola</p>
  ];

  // return (<>
  //   {contadorPillaPilla < numPillaPilla && <div onClick={handlePillaPillaClick}>
  //     <ComponentsPillaPilla />
  //     <p>{contadorPillaPilla}</p>
  //     <Break disabled={contadorPillaPilla < numPillaPilla-2}/>
  //   </div>}
  //   {contadorPillaPilla >= numPillaPilla && <p>Hola</p>}
  // </>)
  
  return (
    COMPONENTSTORENDER[currentRender]
  );
}

export default App;
