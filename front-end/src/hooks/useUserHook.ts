import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UserInfo {
    username: string;
    email: string;
    phoneNumber: string;
}

interface TeamBuyingInfo {
  name: string;
  datetime: string;
  status: "notyet" | "done" | "fail";
  hostFormID: string;
}

interface HistoryList {
  host: TeamBuyingInfo[];
  participant: TeamBuyingInfo[];
}

const useUserHook = () => {
  const [userInfoData, setUserInfoData] = useState<UserInfo>();
  const [userHistoryListData, setHistoryListData] = useState<HistoryList>();

  const { token, userId } = useAuth();

  // Read User Information -> GET /api/user/userinfo/{userId}
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
      //console.log("UserInfo:" + rawData);

      setUserInfoData(rawData);
    } catch (err: any) {
      alert(`An error occurred: ${err.message}`);
    }
  };

  // Update User Information -> PUT /api/user/userinfo/{userId}
  const updateUserInfo = async (formData: UserInfo) => {
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
      alert(`An error occurred: ${err.message}`);
    }
 };

  // Read User History List -> GET /api/user/historylist/{userId}
  const fetchHistoryList = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/user/historylist/${userId}`, {
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
      console.log("HistoryList:" + rawData);

      setHistoryListData(rawData);
    } catch (err: any) {
      alert(`An error occurred: ${err.message}`);
    }
  };

  // init all data from API
  useEffect(() => {
    fetchUserInfo();
    fetchHistoryList();
  }, []);

  return { userInfoData, userHistoryListData, updateUserInfo };
};
export default useUserHook;
