import React, { useEffect, useState,useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './EdadMedia.module.scss';
import globalStyles from '../../App.css'
import { butterflyImage } from '../../App';

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
    if(dialog.position<dialogs.length-1){
      setDialog({position:(dialog.position+1),desc:dialogs[dialog.position+1]});
    }
  }

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
      </div>


    </div>
  );
};


export default EdadMedia;
