import { useState, useEffect } from 'react';

interface OrderItem {
  product: string;
  note: string;
  price: number;
  number: number;
}

interface StatusData {
  transferInformation: string;
  teambuyingHostId: number;  // Added teambuyingHostId
  paymentSatus: number;
  teamBuyngDeadline: string;
  hostcontact: string;
  teamBuyingName: string;
  order: OrderItem[];
}

interface UseStatusHookReturn {
  statusData: StatusData | null;
  loading: boolean;
  error: string | null;
  total: number;
  formattedDeadline: string;
  teambuyingHostId: number | null;  // Added to return interface
}

export const useStatusHook = (hostformId: string, participantId: string): UseStatusHookReturn => {
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(
          `http://localhost:9090/api/orderforms/${hostformId}/${participantId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch status data');
        }

        const data = await response.json();
        setStatusData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchStatusData();
  }, [hostformId, participantId]);

  // Calculate total price
  const total = statusData?.order.reduce((sum, item) => {
    return sum + (item.price * item.number);
  }, 0) ?? 0;

  // Format deadline
  const formattedDeadline = statusData?.teamBuyngDeadline 
    ? new Date(statusData.teamBuyngDeadline).toLocaleString()
    : '';

  return {
    statusData,
    loading,
    error,
    total,
    formattedDeadline,
    teambuyingHostId: statusData?.teambuyingHostId ?? null,  // Added to return value
  };
};