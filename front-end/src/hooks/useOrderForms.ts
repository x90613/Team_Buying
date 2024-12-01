import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface OrderListItem {
  note: string;
  product: string;
  quantity: number;
  price: number;
  'participant id': number;
  participantName: string;
  paymentStatus: number;
  participantFormId: number;
  anonymous: boolean;
}

interface OrderResponse {
  orderList: OrderListItem[];
}

interface OrderDetail {
  participantId: number;
  name: string;
  items: { 
    itemName: string; 
    number: string; 
    price: number;
    participantFormId: number;
  }[];
  total: number;
  status: number;
}

const useOrderForms = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const { host_form_id } = useParams();
  const { token } = useAuth();

  const handleTransfer = async (participantFormId: number) => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setError('Please log in to perform this action');
      return;
    }

    try {
      const response = await fetch(`http://localhost:9090/api/management/transfer/${participantFormId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          paymentStatus: 1
        }),
        credentials: 'include'
      });

      if (response.status === 401) {
        localStorage.clear();
        setError('Session expired. Please log in again.');
        return;
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setOrderDetails(prevDetails => 
        prevDetails.map(order => ({
          ...order,
          status: order.items.some(item => item.participantFormId === participantFormId) ? 1 : order.status,
          items: order.items.map(item => ({
            ...item
          }))
        }))
      );
    } catch (err) {
      console.error('Transfer error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update payment status');
    }
  };

  useEffect(() => {
    const fetchOrderForms = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setError('Please log in to view orders');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:9090/api/orderforms/${host_form_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          credentials: 'include'
        });

        if (response.status === 401) {
          localStorage.clear();
          setError('Session expired. Please log in again.');
          return;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({
            message: `HTTP error! status: ${response.status}`
          }));
          throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }

        const data: OrderResponse = await response.json();
        console.log('Received data:', data);

        if (!data.orderList || !Array.isArray(data.orderList)) {
          throw new Error('Invalid order list format');
        }

        const ordersByParticipant: { [key: number]: OrderListItem[] } = {};
        data.orderList.forEach(order => {
          const participantId = order['participant id'];
          if (!ordersByParticipant[participantId]) {
            ordersByParticipant[participantId] = [];
          }
          ordersByParticipant[participantId].push(order);
        });

        const transformedOrders: OrderDetail[] = Object.entries(ordersByParticipant).map(([participantId, orders]) => {
          const items = orders.map(order => ({
            itemName: order.product,
            number: `${order.quantity}`,
            price: order.price * order.quantity,
            participantFormId: order.participantFormId
          }));

          const total = items.reduce((sum, item) => sum + item.price, 0);
          const status = orders[0]?.paymentStatus ?? 0;
          const name = orders[0]?.anonymous ? "Anony" : orders[0]?.participantName;

          return {
            participantId: parseInt(participantId),
            name,
            items,
            total,
            status
          };
        });

        setOrderDetails(transformedOrders);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching orders');
        
        if (err instanceof Error && err.message.includes('401')) {
          localStorage.clear();
          setError('Session expired. Please log in again.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (host_form_id) {
      fetchOrderForms();
    }
  }, [host_form_id]);

  return { orderDetails, loading, error, handleTransfer };
};

export default useOrderForms;