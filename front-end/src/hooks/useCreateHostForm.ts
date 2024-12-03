import { useState } from 'react';
import { useAuth } from '..//contexts/AuthContext';
// 定義請求的資料結構類型
interface HostFormRequest {
  title: string;
  others: boolean;
  storeName: string;
  description: string;
  deadline: string; // 格式為 “2024-12-31T23:59:59”
  hostContactInformation: string;
  transferInformation: string;
  image: string | null;
  menuId: number | null;
  open: boolean;
}

// 自訂 Hook
const useCreateHostForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { token, username, userId, isLoggedIn } = useAuth();
  const createHostForm = async (formData: HostFormRequest) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const processedFormData = {
        ...formData,
        menuId: formData.menuId === -1 ? null : formData.menuId, // 將 menuId 的 -1 改為 null
        image: formData.image === '' ? null : formData.image, // 將空字串的 image 改為 null
        hostContactInformation: formData.hostContactInformation === '' ? null : formData.hostContactInformation, // 將空字串的 hostContactInformation 改為 null
      };


      const response = await fetch('http://localhost:9090/api/hostforms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(processedFormData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      setSuccess(true);
      return data.id;

    } catch (err: any) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  return { createHostForm, loading, error, success };
};

export default useCreateHostForm;
