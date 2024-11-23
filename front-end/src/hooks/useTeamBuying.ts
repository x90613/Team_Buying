import { useState, useEffect } from 'react';

// 定義返回的資料結構類型
interface TeamBuying {
  id: number;
  host_id: number;
  dead_time: Date;
  start_time: Date;
  description: string;
  menu_id: number;
  open: boolean;
  status: number;
  title: string;
  img: string | null;
  store_name: string;
  transfer_information: string;
  contact_information: string;
  participantCount: number;
  averageFeedbackScore: number;
  menu_store_name: string | null;
  menu_store_img: string | null;
  user_name: string;
}

// 自訂 Hook
const useTeamBuying = () => {
  const [teamBuyings, setTeamBuyings] = useState<TeamBuying[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamBuyings = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:9090/api/TeamBuyings/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const rawData = await response.json();
        console.log(rawData);
        // 將時間字串轉換為 timestamp
        const data: TeamBuying[] = rawData.map((item: any) => ({
          ...item,
          dead_time: new Date(item.dead_time).getTime(), // 轉為 timestamp
          start_time: new Date(item.start_time).getTime(), // 轉為 timestamp
        }));

        setTeamBuyings(data);
      } catch (err: any) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamBuyings();
  }, []);

  return { teamBuyings, loading, error };
};

export default useTeamBuying;
