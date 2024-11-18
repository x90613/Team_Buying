
import { FC, useRef, useState } from 'react';
import styles from './UserBotton.module.css';
import cross from '/assets/Cross_item.png'
import logo from '/assets/logo.png';
import eyeIcon from '/assets/Eye.png';
import UserInformation from './UserInformation';
import HistoryList from './HistoryList';
import NowHosting from './NowHosting';
import ReviewList from './ReviewList';

interface UserBottonProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserBotton: FC<UserBottonProps> = ({ isOpen, onClose}) => {
  const[option, setOption] = useState(0);
  if (!isOpen) return null;


  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
            <img className={styles.closeButton} src={cross}/>
        </button>
        <div className={styles.buttonContainer}>
          <button className={option === 0 ? styles.selectedOptionbutton: styles.optionbutton} onClick={() => setOption(0)}>User Information</button>
          <button className={option === 1 ? styles.selectedOptionbutton: styles.optionbutton} onClick={() => setOption(1)}>History List</button>
          <button className={option === 2 ? styles.selectedOptionbutton: styles.optionbutton} onClick={() => setOption(2)}>Now Hosting</button>
          <button className={option === 3 ? styles.selectedOptionbutton: styles.optionbutton} onClick={() => setOption(3)}>Now Buying</button>
          <button className={option === 4 ? styles.selectedOptionbutton: styles.optionbutton} onClick={() => setOption(4)}>Review List</button>
        </div>
        <div className={styles.inputContainer}>
          {option === 0 ? <UserInformation /> : null}
          {option === 1 ? <HistoryList /> : null}
          {option === 2 ? <NowHosting /> : null}
          {option === 3 ? <NowHosting /> : null}
          {option === 4 ? <ReviewList /> : null}
        </div>
      </div>
    </div>
  );
};

export default UserBotton;
