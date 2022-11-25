import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pilla-pilla.module.scss';
import {useRef} from 'react';
import { butterflyImage } from '../../App';

// function changeImagePosition(){

// }

function ComponentsPillaPilla() {
  const ref = useRef(null);

  const handleClick = () => {

    // 👇️ (better) use a ref
    const el2 = ref.current;
    el2.style.opacity=0;
    
    setTimeout(()=>{
      let flip=Math.random() < 0.5;
      el2.style.transform="scaleX("+(flip?-1:1)+")";
      el2.style.left=(Math.floor(Math.random() * 80) + 1) +'%';
      el2.style.top=(Math.floor(Math.random() * 80) + 1) +'%';
      el2.style.opacity=1;
    },500)
  };

  return (
    <div ref={ref} className={styles.container} onClick={handleClick} >
      <img className={styles.image} alt="" src={butterflyImage}/>
    </div>
  );
}

export default ComponentsPillaPilla;
