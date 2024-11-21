
import { FC, useRef, useState } from 'react';
import styles from './TeamBuying.module.css';
import arrow from '/assets/Arrow.png'
import fail from '/assets/Status/Fail.png'
import Done from '/assets/Status/Done.png'
import NotYet from '/assets/Status/NotYet.png'

interface TeamBuyingProps {
  name: string;
  datetime: string;
  status: string;
  hostFormID: string;
}

const TeamBuying: FC<TeamBuyingProps> = ({name, datetime, status, hostFormID}) => {

  const statusIcon = (status: string) => {
    if(status == "fail"){
      return <img src={fail}/>
    } else if(status == "done"){
      return <img src={Done}/>
    } else if(status == "notyet"){
      return <img src={NotYet}/>
    }
  }

  return (
    <>
      <button className={styles.TeamBuyingButton}>
        <span className={styles.name}>{name}</span>
        <div className={styles.rightSection}>
          <span className={styles.datetime}>{datetime}</span>
          {statusIcon(status)}
          <img className={styles.arrow} src={arrow} />
        </div>
      </button>
    </>
  );
};

export default TeamBuying;
