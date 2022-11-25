import React, { useState } from 'react';
import './App.css';
import ComponentsPillaPilla from './components/Pilla-pilla/Pilla-pilla'
import Break from './components/Break/Break'
import EdadMedia from './components/EdadMedia/EdadMedia'
import Piratas from './components/Piratas/Piratas'
import Espacio from './components/Espacio/Espacio'
import Victoriano from './components/Espacio/Espacio'

export const butterflyImage="/butterfly.webp";
function App() {
  const numPillaPilla=4;
  const numCracks=20;
  const step=200;
  const [currentRender, setCurrentRender] = useState(0);
  const [contadorPillaPilla,setContadorPillaPilla] =useState(0);

  const handlePillaPillaClick = () => {
    setContadorPillaPilla(contadorPillaPilla + 1);
    if(contadorPillaPilla === numPillaPilla) {
      setTimeout(()=>setCurrentRender(1),step*(numCracks-2) );
    }
  }


  const COMPONENTSTORENDER=[
    <div onClick={handlePillaPillaClick}>
      <ComponentsPillaPilla />
      {contadorPillaPilla>=numPillaPilla-1 && <Break numCracks={numCracks} step={step}/>}
    </div>,
    <EdadMedia/>,
    <Piratas/>,
    <Espacio/>,
    <Victoriano/>
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
    // COMPONENTSTORENDER[currentRender]
    <EdadMedia/>
  );
}

export default App;
