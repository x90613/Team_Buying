
import { FC, useState } from 'react';
import styles from './UserBotton.module.css';
import cross from '/assets/Cross_item.png'
import logo from '/assets/logo.png';
import eyeIcon from '/assets/Eye.png';

interface UserBottonProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserBotton: FC<UserBottonProps> = ({ isOpen, onClose}) => {

  if (!isOpen) return null;


  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
            <img className={styles.closeButton} src={cross}/>
        </button>
        <div className={styles.inputContainer}>
          <label className={styles.label}>UserName</label>
          <input
            type="text"
            placeholder=""
            required
            className={styles.inputField}
          />
          <label className={styles.label}>E-mail</label>
          <input
            type="text"
            placeholder=""
            required
            className={styles.inputField}
          />
          <label className={styles.label}>Phone</label>
          <input
            type="text"
            placeholder=""
            required
            className={styles.inputField}
          />
          <button type='submit' className={styles.modifyButton}>Modify</button>
        </div>
      </div>
    </div>
  );
};

export default UserBotton;
