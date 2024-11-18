
import { FC, useRef, useState } from 'react';
import styles from './UserBotton.module.css';
import cross from '/assets/Cross_item.png'
// import logo from '/assets/logo.png';
// import eyeIcon from '/assets/Eye.png';

interface HistoryListProps {
}

export const HistoryList: FC<HistoryListProps> = ({}) => {
  // for cross-component update between input and modify botton
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  return (
    <>
        <label className={styles.label}>UserName</label>
        <input
        type="text"
        placeholder="history"
        ref={userNameRef}
        required
        className={styles.inputField}
        />
        <label className={styles.label}>E-mail</label>
        <input
        type="text"
        placeholder=""
        ref={emailRef}
        required
        className={styles.inputField}
        />
        <label className={styles.label}>Phone</label>
        <input
        type="text"
        placeholder=""
        ref={phoneRef}
        required
        className={styles.inputField}
        />
        <button type='submit' className={styles.modifyButton}>Modify</button>
    </>
  );
};

export default HistoryList;
