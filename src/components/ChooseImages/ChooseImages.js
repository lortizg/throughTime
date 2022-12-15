import React from 'react';
import PropTypes from 'prop-types';
import styles from './ChooseImages.module.scss';

function ChooseImages ({img1,img2,choose}){

  return (
    <div className={styles.ChooseImages}>
      <div onClick={event => choose(0)}>
        <img src={img1}></img>
      </div>
      <div onClick={event => choose(1)}>
        <img src={img2}></img>
      </div>
    </div>
  );
};

export default ChooseImages;
