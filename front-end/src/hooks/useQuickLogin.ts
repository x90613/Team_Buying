import { useState } from 'react';

interface LoginResponse {
  token: string;
  username: string;
  userId: string;
}

const useQuickLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quickLogin = async (userName: string, password: string): Promise<LoginResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:9090/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { quickLogin, loading, error };
};

export default useQuickLogin;
