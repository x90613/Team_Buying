
import { FC, useState } from 'react';
import styles from './UserBotton.module.css';
import cross from '/assets/Cross_item.png'
import UserInformation from './UserInformation/UserInformation';
import HistoryList from './HistoryList/HistoryList';
import NowHosting from './NowHosting/NowHosting';
import NowBuying from './NowBuying/NowBuying';
import ReviewList from './ReviewList/ReviewList';


interface UserBottonProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserBotton: FC<UserBottonProps> = ({ isOpen, onClose}) => {
  const[option, setOption] = useState(0);
  if (!isOpen) return null;

  const options = [
    { id: 0, label: 'User Information', component: <UserInformation /> },
    { id: 1, label: 'History List', component: <HistoryList /> },
    { id: 2, label: 'Now Hosting', component: <NowHosting /> },
    { id: 3, label: 'Now Buying', component: <NowBuying /> }, // 之後改成對應的 Component
    { id: 4, label: 'Review List', component: <ReviewList /> },
  ];



  return (
    <div className={styles.Useroverlay} onClick={onClose}>
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
          {options.find(({ id }) => id === option)?.component || null}
        </div>
      </div>
    </div>
  );
};

export default UserBotton;
