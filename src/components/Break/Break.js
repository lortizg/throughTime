import React, { useEffect, useState } from 'react';
import styles from './Break.module.scss';

const getGlasses = (numCracks) => {
  let glasses = [];

  for(let i=0;i<numCracks;i++) {
    glasses.push({
      rotate: Math.floor(Math.random() * 180) - 90,
      posX:Math.floor(Math.random() * 160) -80,
      posY: Math.floor(Math.random() * 160) -80,
      opacity:0
    });
  }

  return glasses;
}

function Break({ numCracks = 20, step = 250 }) {
  const [glasses, set] = useState(getGlasses(numCracks));

  /** equivalente a component did mount */
  useEffect(() => {
    for (let i = 0; i < numCracks; i++){
      setTimeout(()=>{
        glasses[i]["opacity"]=1;
        let arr = glasses.slice(0);
        arr[i]['opacity'] = 1;
        set(arr);
      }, step * i)
    }

    /** Dependencias. Si metiera glasses se ejecutaria lo de antes cada vez que cambie el estado de este */
  }, []);

  // const handleClick = () => {
  //   console.log("Break clicked");
  //   for (let i = 0; i < numCracks; i++){
  //     setTimeout(()=>{
  //       glasses[i]["opacity"]=1;
  //       let arr = glasses.slice(0);
  //       arr[i]['opacity'] = 1;
  //       set(arr);
  //     }, step * i)
  //   }
  // }

  return (
    <div className={styles.wrapper} >
      {glasses.map((glass, key) => (<Glass key={key} rotate={glass.rotate} posX={glass.posX} posY={glass.posY} opacity={glass.opacity} />))}
      {/* {glasses.map(glass => glass)} */}
    </div>
  );
}


function Glass({ posX, posY, rotate, opacity }){
  let newTransform="rotate("+rotate+"deg) translate("+posX+"%,"+ posY+"%)";
  return (
    <img className={styles.crack} style={{transform:newTransform, opacity:opacity}} src="https://pngimg.com/uploads/broken_glass/broken_glass_PNG38.png" alt=""/>
  );
}
export default Break;



/******************** */
