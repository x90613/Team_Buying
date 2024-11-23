import { useState, useEffect } from 'react';

interface Product {
  id: number;
  menu_id: number;
  product: string;
  price: number;
}

interface Menu {
  id: number;
  img: string;
  name: string;
  products: Product[];
}

const useGetMenu = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:9090/api/menu', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data: Menu[] = await response.json();
        setMenus(data);
      } catch (err: any) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  return { menus, loading, error };
};

export default useGetMenu;
