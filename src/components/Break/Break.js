import React from 'react';
import PropTypes from 'prop-types';
import styles from './Break.module.scss';

function Break() {
  let images=[];
  const numCracks=20;
  for(let i=0;i<numCracks;i++){
    images.push(<Glass 
            key={i}
            rotate={Math.floor(Math.random() * 180)-90} 
            posX={Math.floor(Math.random() * 160) -80}
            posY={Math.floor(Math.random() * 160) -80}
          ></Glass>);
  }

  const handleClick = () => {
    images=document.getElementsByClassName(styles.crack);
    for(let i=0;i<numCracks;i++){
      setTimeout(()=>{images[i].style.opacity=1;},500);
    }
  }
  return (
    <div onClick={handleClick} className={styles.wrapper} >
      {images}
      
    </div>
  );
}


function Glass(props){
  let newTransform="rotate("+props.rotate+"deg) translate("+props.posX+"%,"+ props.posY+"%)";
  return (
    <img className={styles.crack} style={{transform:newTransform}} src="https://pngimg.com/uploads/broken_glass/broken_glass_PNG38.png" alt=""/>
  );
}
export default Break;



/******************** */
