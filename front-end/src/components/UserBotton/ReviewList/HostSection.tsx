
import { FC, useRef, useState } from 'react';
import styles from './HostSection.module.css';
import arrow from '/assets/Arrow.png'
import FiveStars from '/assets/Star/FiveStars.png';
import FourStars from '/assets/Star/FourStars.png';
import ThreeStars from '/assets/Star/ThreeStars.png';
import TwoStars from '/assets/Star/TwoStars.png';
import OneStar from '/assets/Star/OneStar.png';

interface HostSectionProps {
  name: string;
  datetime: string;
  star: '1' | '2' | '3' | '4' | '5';
  hostFormID: string;
  handleClick: (hostFormID: string) => void;
}

const HostSection: FC<HostSectionProps> = ({name, datetime, star,hostFormID, handleClick}) => {
  const starImage = {
    '1': OneStar,
    '2': TwoStars,
    '3': ThreeStars,
    '4': FourStars,
    '5': FiveStars,
  };

  return (
    <>
      <button className={styles.HostSectionButton} onClick={() => handleClick(hostFormID)}>
        <span className={styles.name}>{name}</span>
        <div className={styles.rightSection}>
          <span className={styles.datetime}>{datetime}</span>
          <img src={starImage[star]} />
          <img className={styles.arrow} src={arrow} />
        </div>
      </button>
    </>
  );
};

export default HostSection;
