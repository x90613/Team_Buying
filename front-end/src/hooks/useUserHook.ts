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
  status: "0" | "1" | "2"; // for shared component
  paymentStatus: "0" | "1" | "2"; // for shared component
  hostformId: string;
}

interface HistoryList {
  host: TeamBuyingInfo[];
  participant: TeamBuyingInfo[];
}

interface ReviewList {
  name: string;
  datetime: string;
  star: 1 | 2 | 3 | 4 | 5;
  hostFormId: string;
}

interface Review {
  name: string;
  datetime: string;
  star: 1 | 2 | 3 | 4 | 5;
  content: string;
}

// APIs
// 1. Read User Information -> GET /api/user/userinfo/{userId}
// 2. Update User Information -> PUT /api/user/userinfo/{userId}
// 3. Read User History List -> GET /api/user/historylist/{userId}
// 4. Read User Nowhosting -> GET /api/user/nowhosting/{userId}
// 5. Read User NowBuying -> GET /api/user/nowbuying/{userId}
// 6. Read Review List -> GET /api/user/reviewlist/{userId}
// 7. Read Reviews -> GET /api/user/reviewlist/review/{hostFormId}

const useUserHook = () => {
  const [userInfoData, setUserInfoData] = useState<UserInfo>();
  const [userHistoryListData, setHistoryListData] = useState<HistoryList>();
  const [userNowHostingData, setNowHostingData] = useState<TeamBuyingInfo[]>();
  const [userNowBuyingData, setNowBuyingData] = useState<TeamBuyingInfo[]>();
  const [userReviewListData, setReviewListData] = useState<ReviewList[]>();
  const [userReviewData, setReviewData] = useState<Review[]>();

  const { token, userId } = useAuth();

  // 1. Read User Information -> GET /api/user/userinfo/{userId}
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
      alert(`An fetchUserInfo error occurred: ${err.message}`);
    }
  };

  // 2. Update User Information -> PUT /api/user/userinfo/{userId}
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
      alert(`An updateUserInfo error occurred: ${err.message}`);
    }
 };

  // 3. Read User History List -> GET /api/user/historylist/{userId}
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
      // console.log("HistoryList.host: " + JSON.stringify(rawData.host, null, 2));
      // console.log("HistoryList.participant: " + JSON.stringify(rawData.participant, null, 2));

      setHistoryListData(rawData);
    } catch (err: any) {
      alert(`An HistoryList error occurred: ${err.message}`);
    }
  };

  // 4. Read User Nowhosting -> GET /api/user/nowhosting/{userId}
  const fetchNowHosting = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/user/nowhosting/${userId}`, {
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
      console.log("Nowhosting: " + JSON.stringify(rawData, null, 2));

      setNowHostingData(rawData);
    } catch (err: any) {
      alert(`An NowHosting error occurred: ${err.message}`);
    }
  };

  // 5. Read User NowBuying -> GET /api/user/nowbuying/{userId}
  const fetchNowBuying = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/user/nowbuying/${userId}`, {
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
      //console.log("Nowhosting: " + JSON.stringify(rawData, null, 2));

      setNowBuyingData(rawData);
    } catch (err: any) {
      alert(`An NowBuying error occurred: ${err.message}`);
    }
  };

  // 6. Read Review List -> GET /api/user/reviewlist/{userId}
  const fetchReviewList = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/user/reviewlist/${userId}`, {
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
      //console.log("ReviewList: " + JSON.stringify(rawData, null, 2));

      setReviewListData(rawData);
    } catch (err: any) {
      alert(`An ReviewList error occurred: ${err.message}`);
    }
  };

  // 7. Read Reviews -> GET /api/user/reviewlist/review/{hostFormId}
  const fetchReviews = async (hostFormId: string) => {
    console.log("hostFormId: " + hostFormId);
    try {
      const response = await fetch(`http://localhost:9090/api/user/reviewlist/review/${hostFormId}`, {
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
      //console.log("Reviews: " + JSON.stringify(rawData, null, 2));

      setReviewData(rawData);
    } catch (err: any) {
      alert(`An Reviews error occurred: ${err.message}`);
    }
  };

  // init all data from API
  useEffect(() => {
    fetchUserInfo();
    fetchHistoryList();
    fetchNowHosting();
    fetchNowBuying();
    fetchReviewList();
  }, []);

  return { userInfoData, userHistoryListData, userNowHostingData, userNowBuyingData, userReviewListData, userReviewData, fetchReviews, updateUserInfo };
};
export default useUserHook;
