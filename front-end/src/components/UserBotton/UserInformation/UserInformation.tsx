import { FC, useEffect, useRef, useState } from 'react';
import styles from './UserInformation.module.css';
import useUserHook from '../../../hooks/useUserHook';
import { useAuth } from '../../../contexts/AuthContext';

interface UserInformationProps {
}

export const UserInformation: FC<UserInformationProps> = ({}) => {
  // for cross-component update between input and modify botton
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const { userInfoData, updateUserInfo } = useUserHook();
  const { logout } = useAuth();

  useEffect(() => {
    // load the values from hook to the screen
    if (userInfoData) {
      userNameRef.current!.value = userInfoData.username? userInfoData.username : '';
      emailRef.current!.value = userInfoData.email? userInfoData.email : '';
      phoneNumberRef.current!.value = userInfoData.phoneNumber? userInfoData.phoneNumber : '';
    }
  }, [userInfoData]);

  const handleModify = async () => {
    const formData = {
      username: userNameRef.current!.value,
      email: emailRef.current!.value,
      phoneNumber: phoneNumberRef.current!.value,
    };
    await updateUserInfo(formData);
  };

  const handleLogout = async () => {

  };


  return (
    <>
        <label className={styles.label}>UserName</label>
        <input
        type="text"
        ref={userNameRef}
        required
        className={styles.inputField}
        />
        <label className={styles.label}>E-mail</label>
        <input
        type="text"
        ref={emailRef}
        required
        className={styles.inputField}
        />
        <label className={styles.label}>Phone</label>
        <input
        type="text"
        ref={phoneNumberRef}
        required
        className={styles.inputField}
        />
        <button type='submit' onClick={handleModify} className={styles.modifyButton}>Modify</button>
        <button type='submit' onClick={() => logout()} className={styles.modifyButton}>Logout</button>
    </>
  );
};

export default UserInformation;
