import { FC } from 'react';
import styles from './TeamBuying.module.css';
import arrow from '/assets/Arrow.png';
import fail from '/assets/Status/Fail.png';
import Done from '/assets/Status/Done.png';
import NotYet from '/assets/Status/NotYet.png';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface TeamBuyingProps {
  name: string;
  datetime: string;
  status: string;
  hostformId: string;
  hostId: string;
  isHost: boolean;
}

const TeamBuying: FC<TeamBuyingProps> = ({ name, datetime, status, hostformId, hostId, isHost}) => {
  const navigate = useNavigate();
  const { isLoggedIn, userId } = useAuth();

  const statusIcon = (status: string) => {
    if (status === "2") {
      return <img src={fail} alt="Fail" />;
    } else if (status === "1") {
      return <img src={Done} alt="Done" />;
    } else if (status === "0") {
      return <img src={NotYet} alt="Not Yet" />;
    }
    return null; // Handle any other cases
  };

  const handleJoinClick = () => {
    console.log('hostFormId', hostformId);
    if (!isLoggedIn) {
      alert('Please click on the avatar in the bottom-right corner to log in quickly.');
      return;
    }
    if(isHost){
      navigate(`/order-item/${hostId}/${hostformId}`);
    } else {
      navigate(`/order-item/status/${hostformId}/${userId}`);
    }
  };

  return (
    <button className={styles.TeamBuyingButton} onClick={() => handleJoinClick()}>
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
