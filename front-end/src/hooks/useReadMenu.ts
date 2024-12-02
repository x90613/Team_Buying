import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: number;
  menu_id: number;
  price: number;
  product: string;
}

interface MenuResponse {
  id: number;
  name: string;
  img: string;
  products: Product[];
}

interface HostFormResponse {
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

const useReadMenu = () => {
  const [menuData, setMenuData] = useState<MenuResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { host_form_id } = useParams();

  useEffect(() => {
    const clearMenuData = () => {
      localStorage.removeItem('menuData');
    };

    const fetchData = async () => {
      if (!host_form_id) {
        setError('Host form ID is required');
        setLoading(false);
        return;
      }

      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setError('Please log in to view menu');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        clearMenuData();

        // 獲取 host form 數據以得到 menuId
        const hostFormResponse = await fetch(`http://localhost:9090/api/hostforms/${host_form_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          credentials: 'include'
        });

        if (!hostFormResponse.ok) {
          throw new Error(`Host form error: ${hostFormResponse.status}`);
        }

        const hostFormData: HostFormResponse = await hostFormResponse.json();
        const targetMenuId = hostFormData.menuId;

        // 獲取所有菜單數據
        const menuResponse = await fetch('http://localhost:9090/api/menu', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          credentials: 'include'
        });

        if (!menuResponse.ok) {
          throw new Error(`Menu error: ${menuResponse.status}`);
        }

        const allMenus: MenuResponse[] = await menuResponse.json();

        // 找到對應的菜單並過濾產品
        const targetMenu = allMenus.find(menu => menu.id === targetMenuId);

        if (!targetMenu) {
          throw new Error(`Menu not found for ID: ${targetMenuId}`);
        }

        // 創建新的菜單對象，只包含該菜單ID的產品
        const filteredProducts = targetMenu.products
          .filter(product => product.menu_id === targetMenuId)
          .sort((a, b) => a.id - b.id);  // 根據 ID 排序

        const cleanedMenuData = {
          id: targetMenu.id,
          name: targetMenu.name,
          img: targetMenu.img,
          products: filteredProducts
        };

        // 存儲到 localStorage 並更新狀態
        localStorage.setItem('menuData', JSON.stringify(cleanedMenuData));
        setMenuData(cleanedMenuData);

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching menu data');

        if (err instanceof Error && err.message.includes('401')) {
          localStorage.clear();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      clearMenuData();
    };
  }, [host_form_id]);

  const refreshMenu = async () => {
    if (!host_form_id) {
      setError('Host form ID is required');
      return;
    }

    setLoading(true);
    localStorage.removeItem('menuData');

    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        throw new Error('Please log in to refresh menu');
      }

      // 獲取 host form 數據
      const hostFormResponse = await fetch(`http://localhost:9090/api/hostforms/${host_form_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include'
      });

      if (!hostFormResponse.ok) {
        throw new Error(`Host form error: ${hostFormResponse.status}`);
      }

      const hostFormData: HostFormResponse = await hostFormResponse.json();
      const targetMenuId = hostFormData.menuId;

      // 獲取菜單數據
      const menuResponse = await fetch('http://localhost:9090/api/menu', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include'
      });

      if (!menuResponse.ok) {
        throw new Error(`Menu error: ${menuResponse.status}`);
      }

      const allMenus: MenuResponse[] = await menuResponse.json();
      const targetMenu = allMenus.find(menu => menu.id === targetMenuId);

      if (!targetMenu) {
        throw new Error(`Menu not found for ID: ${targetMenuId}`);
      }

      // 過濾產品並排序
      const filteredProducts = targetMenu.products
        .filter(product => product.menu_id === targetMenuId)
        .sort((a, b) => a.id - b.id);

      const cleanedMenuData = {
        id: targetMenu.id,
        name: targetMenu.name,
        img: targetMenu.img,
        products: filteredProducts
      };

      localStorage.setItem('menuData', JSON.stringify(cleanedMenuData));
      setMenuData(cleanedMenuData);
      setError(null);

    } catch (err) {
      console.error('Refresh error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while refreshing menu data');
    } finally {
      setLoading(false);
    }
  };

  return { menuData, loading, error, refreshMenu };
};

export default useReadMenu;
