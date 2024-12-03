import { FC, useEffect, useRef, useState } from 'react';
import styles from './UserInformation.module.css';
import useUserHook from '../../../hooks/useUserHook';

interface UserInformationProps {
}

export const UserInformation: FC<UserInformationProps> = ({}) => {
  // for cross-component update between input and modify botton
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const { userInfoData, updateUserInfo } = useUserHook();

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
    </>
  );
};

export default UserInformation;
