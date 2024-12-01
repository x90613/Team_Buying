import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetMenu from '../hooks/useGetMenu';

interface OrderItem {
  order: string;
  quantity: string;
  price: string;
  description?: string;
}

interface MenuItem {
  name: string;
  img: string;
  products: Product[];
}

interface Product {
  product: string;
  price: number;
}

interface UseCreateParticipantFormReturn {
  inputGroups: OrderItem[];
  isAnonymous: boolean;
  userName: string;
  loading: boolean;
  error: string | null;
  menus: MenuItem[];
  menuLoading: boolean;
  menuError: string | null;
  addInputGroup: () => void;
  deleteInputGroup: (index: number) => void;
  updateInputGroup: (index: number, field: keyof OrderItem, value: string) => void;
  setIsAnonymous: (value: boolean) => void;
  setUserName: (name: string) => void;
  handleSubmit: () => Promise<void>;
}

export const useCreateParticipantForm = (onConfirm?: () => void): UseCreateParticipantFormReturn => {
  const navigate = useNavigate();
  const { host_form_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const { menus, loading: menuLoading, error: menuError } = useGetMenu();
  
  const [inputGroups, setInputGroups] = useState<OrderItem[]>([{
    order: '',
    quantity: '',
    price: '',
    description: ''
  }]);
  
  const [isAnonymous, setIsAnonymous] = useState(false);

  const addInputGroup = () => {
    setInputGroups(prev => [...prev, { order: '', quantity: '', price: '', description: '' }]);
  };

  const deleteInputGroup = (indexToDelete: number) => {
    setInputGroups(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  const updateInputGroup = (index: number, field: keyof OrderItem, value: string) => {
    setInputGroups(prev => {
      const newInputGroups = [...prev];
      
      if (field === 'order') {
        try {
          const selectedItem = JSON.parse(value);
          newInputGroups[index] = {
            ...newInputGroups[index],
            order: selectedItem.name,
            price: selectedItem.price.toString()
          };
        } catch (e) {
          newInputGroups[index] = {
            ...newInputGroups[index],
            [field]: value
          };
        }
      } else {
        newInputGroups[index] = {
          ...newInputGroups[index],
          [field]: value
        };
      }
      
      return newInputGroups;
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token) {
        navigate('/login');
        return;
      }

      if (!userId) {
        throw new Error('使用者ID未找到');
      }
  
      // Validate inputs
      const hasEmptyFields = inputGroups.some(
        item => !item.order || !item.quantity || !item.price
      );
      
      if (hasEmptyFields) {
        alert('請填寫所有必填欄位');
        return;
      }
  
      if (!isAnonymous && !userName.trim()) {
        alert('請輸入姓名或選擇匿名');
        return;
      }

      const payload = {
        hostformId: Number(host_form_id),
        participantId: Number(userId),
        anonymous: isAnonymous,
        userName: userName,
        order: inputGroups.map(item => item.order),
        quantity: inputGroups.map(item => item.quantity),
        price: inputGroups.map(item => parseFloat(item.price))
      };

      const response = await fetch('http://localhost:9090/api/orderforms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || '送出訂單失敗');
      }

      // 成功後導航到訂單狀態頁面
      navigate(`/order-item/status/${host_form_id}/${userId}`);
      
      if (onConfirm) {
        onConfirm();
      }
      
    } catch (error) {
      alert(error instanceof Error ? error.message : '發生意外錯誤');
      console.error('Error submitting order:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    inputGroups,
    isAnonymous,
    userName,
    loading,
    error,
    menus,
    menuLoading,
    menuError,
    addInputGroup,
    deleteInputGroup,
    updateInputGroup,
    setIsAnonymous,
    setUserName,
    handleSubmit
  };
};