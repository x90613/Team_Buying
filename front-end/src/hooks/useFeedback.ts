import { useState } from 'react';
import { useAuth } from '..//contexts/AuthContext';
// 定義請求的資料結構類型
interface FeedbackRequest {
    hostId: string;
    userId: string;
    hostFormId: string;
    score: number;
    content: string;
}

// 自訂 Hook
const useFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { token, username, userId, isLoggedIn } = useAuth();
  const createFeedback = async (formData: FeedbackRequest) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await fetch('http://localhost:9090/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.message);

    } finally {
      setLoading(false);
      return false;
    }
  };

  return { createFeedback, loading, error, success };
};

export default useFeedback;
