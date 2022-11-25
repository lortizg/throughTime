import React, { useEffect, useState,useRef } from 'react';
import styles from './EdadMedia.module.scss';
import { butterflyImage } from '../../App';
import ChooseImages from '../ChooseImages/ChooseImages';

const dialogs=[
  '',
  'Uf, qué mareo...',
  '¡Oh! Ahí estás',
  'Llamas un poquito la atención así, ¿no crees?',
  'Cámbiate de ropa, anda'
]



function EdadMedia () {
  const butterfly = useRef(null);
  const [dialog, setDialog] = useState({position:0,desc:dialogs[0]});
  const [active, setActive] = useState(false);
  const [choosing, setChoosing] = useState(false);

  useEffect(() => {
      setTimeout(()=>{
        butterfly.current.style.opacity=1;
        setActive(true);
      },2000)
      
      setTimeout(()=>{
        setDialog({position:1,desc:dialogs[1]});
      },3000)
    

    /** Dependencias. Si metiera glasses se ejecutaria lo de antes cada vez que cambie el estado de este */
  }, []);

  function handleClick(){
    if(dialog.position<dialogs.length-1 && !choosing){
      setDialog({position:(dialog.position+1),desc:dialogs[dialog.position+1]});
    }
    if(dialog.position===3){
      setChoosing(true);
    }
    if(dialog.position===8){
      setActive(false);
      butterfly.current.style.opacity=0;
    }
  }

  function chooseDress(option) {
    console.log(option);
    option===1? dialogs.push("¿Estás segura de eso, Carla?","Bueno, allá tú","Las aventuras no se viven solas")
      :dialogs.push("Por el camino fácil, ¿eh?","En la ropa no se despilfarra, sí. Eso dice Jaein","Tenga un buen paseo por el pueblo, milady");
    dialogs.push("¡Buena suerte!",'');
    setDialog({position:(dialog.position+1),desc:dialogs[dialog.position+1]});
    setChoosing(false);
  };

  return(
    <div className={styles.EdadMedia}>


      <svg className={styles.filter}>
        <filter id="alphaRed">
          <feColorMatrix mode="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="joint" />
        </filter>
        <filter id="alphaGreen">
          <feColorMatrix mode="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="joint" />
        </filter>
        <filter id="alphaBlue">
          <feColorMatrix mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="joint" />
        </filter>
        <filter id="alpha">
          <feColorMatrix type="saturate" values="0"/>
        </filter>
      </svg>
      
      <div className={styles.page} onClick={handleClick}>
          <div className={styles.imgWrap}>
            <img className={active? styles.red:''} alt="" src="https://mobimg.b-cdn.net/v3/fetch/1c/1c4d7ba0eb22194f5c66d0ccb1272c45.jpeg"/>
            <img className={active? styles.green:''} alt="" src="https://mobimg.b-cdn.net/v3/fetch/1c/1c4d7ba0eb22194f5c66d0ccb1272c45.jpeg"/>
            <img className={active? styles.blue:''} alt="" src="https://mobimg.b-cdn.net/v3/fetch/1c/1c4d7ba0eb22194f5c66d0ccb1272c45.jpeg"/>
            
            
          </div>
          <div id="dialog" className={styles.dialog}>
            <img ref={butterfly} src={butterflyImage} className='butterfly' alt=""/>
            {dialog.desc && <p>{dialog.desc}</p>}
          </div>
          {choosing && <ChooseImages choose={chooseDress} img1="https://64.media.tumblr.com/010f82c83a644871545c7a1954ecccf8/580ffb3cf03a27f2-f4/s1280x1920/6bd7eb339cdb87b60f34360c0844de72f0e07404.png" img2="https://i.pinimg.com/originals/69/bb/a9/69bba99d507c99d25575485824a82ca8.png"/>}
      </div>


    </div>
  );
};


export default EdadMedia;
