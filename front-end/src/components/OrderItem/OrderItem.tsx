import { memo, useState } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import resets from '../_resets.module.css';
import { Component1_Property1Account } from './Component1_Property1Account/Component1_Property1Account.js';
import classes from './OrderItem.module.css';
import { VectorIcon } from './VectorIcon.js';
import useOrderForms from '../../hooks/useOrderForms';
import useReadMenu from '../../hooks/useReadMenu';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  className?: string;
}

export const OrderItem: FC<Props> = memo(function OrderItem(props = {}) {
  const [clickedStates, setClickedStates] = useState<{ [key: number]: boolean }>({});
  const { orderDetails, loading, error, handleTransfer } = useOrderForms();
  const { menuData, loading: menuLoading, error: menuError } = useReadMenu();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleTransferClick = async (index: number, items: any[]) => {
    try {
      const participantFormId = items[0]?.participantFormId;
      if (participantFormId) {
        await handleTransfer(participantFormId);
        setClickedStates(prev => ({
          ...prev,
          [index]: true
        }));
      }
    } catch (err) {
      console.error('Transfer click error:', err);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className={`${resets.clapyResets} ${classes.container}`}>
        <div>請先點右下角頭像進行快速登入</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${resets.clapyResets} ${classes.container}`}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${resets.clapyResets} ${classes.container}`}>
        <div>Error: {error}</div>
        {error.includes('session expired') && (
          <button onClick={() => navigate('/login')}>Login Again</button>
        )}
      </div>
    );
  }

  return (
    <div className={`${resets.clapyResets} ${classes.container}`}>
      <div className={classes.unsplashQJ0zGkrE1Zg}></div>
      <div className={classes.frame29}></div>
      <div className={classes.logo}>
        <div onClick={handleLogoClick} className={classes.logo21}></div>
        <div className={classes.logo31}></div>
      </div>
      {orderDetails.map((order, index) => (
        <div key={index} className={classes.orderDetails}>
          <div className={classes.header}>
            <Component1_Property1Account
              className={classes.component6}
              swap={{
                vector: <VectorIcon className={classes.icon} />,
              }}
            />
            <div className={classes.name}>{order.name}</div>
          </div>
          <div className={classes.itemList}>
            {order.items.map((item, idx) => (
              <div key={idx} className={classes.item}>
                <div className={classes.itemName}>{item.itemName}</div>
                <div className={classes.number}>{item.number}</div>
                <div className={classes.price}>{item.price}</div>
              </div>
            ))}
            <div className={classes.line3}></div>
            <div className={classes.item}>
              <div className={classes.itemName}>Total</div>
              <div className={classes.number}></div>
              <div className={classes.price}>{order.total}</div>
            </div>
            <button
              className={classes.transferButton}
              onClick={() => handleTransferClick(index, order.items)}
              style={{
                backgroundImage: `url('/assets/transfer_${order.status === 1 || clickedStates[index] ? 'white' : 'green'}.png')`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
});
