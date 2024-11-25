import { FC } from 'react';
import styles from './TeamBuying.module.css';
import arrow from '/assets/Arrow.png';
import fail from '/assets/Status/Fail.png';
import Done from '/assets/Status/Done.png';
import NotYet from '/assets/Status/NotYet.png';

interface TeamBuyingProps {
  name: string;
  datetime: string;
  status: string;
  hostFormID: string;
  onClick?: () => void; // Include onClick prop
}

const TeamBuying: FC<TeamBuyingProps> = ({ name, datetime, status, hostFormID, onClick }) => {
  const statusIcon = (status: string) => {
    if (status === 'fail') {
      return <img src={fail} alt="Fail" />;
    } else if (status === 'done') {
      return <img src={Done} alt="Done" />;
    } else if (status === 'notyet') {
      return <img src={NotYet} alt="Not Yet" />;
    }
    return null; // Handle any other cases
  };

  return (
    <button className={styles.TeamBuyingButton} onClick={onClick}>
      <span className={styles.name}>{name}</span>
      <div className={styles.rightSection}>
        <span className={styles.datetime}>{datetime}</span>
        {statusIcon(status)}
        <img className={styles.arrow} src={arrow} alt="Arrow" />
      </div>
    </button>
  );
};

export default TeamBuying;
