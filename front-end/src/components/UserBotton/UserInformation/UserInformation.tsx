
import { FC, useRef, useState } from 'react';
import styles from './UserInformation.module.css';
import cross from '/assets/Cross_item.png'
// import logo from '/assets/logo.png';
// import eyeIcon from '/assets/Eye.png';

interface UserInformationProps {
}

export const UserInformation: FC<UserInformationProps> = ({}) => {
  // for cross-component update between input and modify botton
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // TODO: get user information from backend

  return (
    <>
        <label className={styles.label}>UserName</label>
        <input
        type="text"
        placeholder=""
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

export default UserInformation;
