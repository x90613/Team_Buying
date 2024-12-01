import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Read User Information、Read User Information
interface userInfo {
    username: string;
    email: string;
    phoneNumber: string;
}


const useUserHook = () => {
  const [userInfoData, setUserInfoData] = useState<userInfo>();
  const { token, userId } = useAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:9090/api/user/userinfo/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const rawData = await response.json();
        // console.log(rawData);

        setUserInfoData(rawData);
      } catch (err: any) {
        alert(`An error occurred: ${err.message}`); // 顯示警告視窗
      }
    };
    fetchUserInfo();
  }, []);

 const updateUserInfo = async (formData: userInfo) => {
    try {
      const response = await fetch(`http://localhost:9090/api/user/userinfo/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
    } catch (err: any) {
      alert(`An error occurred: ${err.message}`); // 顯示警告視窗
    }
 };

  return { userInfoData, updateUserInfo };
};
export default useUserHook;
