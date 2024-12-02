import { useState, useEffect } from 'react';

interface OrderItem {
  product: string;
  note: string;
  price: number;
  number: number;
}

interface HostFormData {
  id: number;
  hostId: number;
  menuId: number;
  title: string;
  storeName: string;
  description: string;
  status: number;
  startTime: string;
  deadTime: string;
  hostContactInformation: string;
  transferInformation: string;
  participantInformation: boolean;
  link: string | null;
  open: boolean;
  image: string | null;
}

interface UseHostFormDataReturn {
  hostFormData: HostFormData | null;
  loading: boolean;
  error: string | null;
}

export const useHostFormData = (): UseHostFormDataReturn => {
  const [hostFormData, setHostFormData] = useState<HostFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHostFormData = async () => {
      try {
        // 從當前 URL 獲取 hostformId
        const pathParts = window.location.pathname.split('/');
        const hostformId = pathParts[pathParts.length - 1];

        if (!hostformId) {
          throw new Error('No hostform ID found in URL');
        }

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(
          `http://localhost:9090/api/hostforms/${hostformId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch host form data');
        }

        const data = await response.json();
        setHostFormData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchHostFormData();
  }, []);

  return {
    hostFormData,
    loading,
    error
  };
};
