import { useMemo } from 'react';

export const useUrlParams = () => {
  const hostformId = useMemo(() => {
    const path = window.location.pathname;
    const matches = path.match(/\/order-item\/\d+\/(\d+)/);
    return matches ? matches[1] : null;
  }, []);

  const userId = useMemo(() => {
    return localStorage.getItem('userId');
  }, []);

  return {
    hostformId,
    userId
  };
};
