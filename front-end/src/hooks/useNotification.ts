
import { useEffect } from 'react';

interface NotificationData {
  userName: string;
  message: string;
}

export const useNotification = (userId: string | null, onNotification: (data: NotificationData) => void) => {
  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket(`ws://localhost:9090/ws/notifications/${userId}`);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onNotification(data);
      } catch (error) {
        console.error('Failed to parse notification:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [userId, onNotification]);
};
