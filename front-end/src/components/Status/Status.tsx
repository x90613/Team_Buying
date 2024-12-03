import { memo, useState } from 'react';
import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import resets from '../_resets.module.css';
import { Component1_Property1Account } from './Component1_Property1Account/Component1_Property1Account';
import { Component5_Property1Create } from './Component5_Property1Create/Component5_Property1Create';
import { Component7_Property1Done } from './Component7_Property1Done/Component7_Property1Done';
import { Component7_Property1Fail } from './Component7_Property1Fail/Component7_Property1Fail';
import { Component7_Property1NotYet } from './Component7_Property1NotYet/Component7_Property1NotYet';
import { VectorIcon2 } from './VectorIcon2';
import Review from '../Review/Review';
import { useStatusHook } from '../../hooks/useStatusHook';
import classes from './Status.module.css';

interface Props {
  className?: string;
}

export const StatusComponent: FC<Props> = memo(function Status(props = {}) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [hasNotified, setHasNotified] = useState(false);
  const navigate = useNavigate();
  const { host_form_id, user_id } = useParams<{ host_form_id: string; user_id: string }>();
  const username = localStorage.getItem('username') || 'Order Details';

// In Status.tsx, update the handleNotifyClick function:
const handleNotifyClick = async (e: React.MouseEvent) => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('username');

    // Use teambuyingHostId from the hook
    if (!statusData?.teambuyingHostId) {
      throw new Error('No teambuyingHostId available');
    }

    const response = await fetch(`http://localhost:9090/api/notifications/${statusData.teambuyingHostId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: parseInt(userId || '0'),
        userName: userName
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }

    setHasNotified(true);
  } catch (error) {
    console.error('Error:', error);
  }
};

   // Early return if parameters are missing
  if (!host_form_id || !user_id) {
    return <div>Missing required parameters</div>;
  }
  const {
    statusData,
    loading,
    error,
    total,
    formattedDeadline,
  } = useStatusHook(host_form_id, user_id);

  const handleReviewClick = () => {
    setIsReviewOpen(!isReviewOpen);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!statusData) return <div>No data found</div>;

  const renderPaymentStatus = () => {
    switch (statusData.paymentSatus) {
      case 1:
        return <Component7_Property1Done className={classes.component7} />;
      case 2:
        return <Component7_Property1Fail className={classes.component7} />;
      case 0:
      default:
        return <Component7_Property1NotYet className={classes.component7} />;
    }
  };

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.unsplashQJ0zGkrE1Zg}></div>
      <div className={classes.frame29}></div>
      <div onClick={handleLogoClick} className={classes.logo}>
        <div className={classes.logo21}></div>
        <div className={classes.logo31}></div>
      </div>

      <div className={classes.contentContainer}>
        <div className={classes.teamBuyingInfo}>
          <div className={classes.taoHuaSTeamBuying}>{statusData.teamBuyingName}</div>
          <div className={classes._2024112220}>{formattedDeadline}</div>
          <div className={classes.line2}></div>
        </div>

        <div className={classes.contactSection}>
          <div className={classes.hosterContactInformation}>
            Hoster Contact Information
          </div>
          <div className={classes.link}>{statusData.hostcontact}</div>
        </div>

        <div className={classes.orderDetails}>
          <div className={classes.header}>
            <Component1_Property1Account
              className={classes.component6}
              swap={{
                vector: <VectorIcon2 className={classes.icon2} />,
              }}
            />
            <div className={classes.orderTitle}>{username}</div>
          </div>

          <div className={classes.itemList}>
            {statusData.order.map((item, idx) => (
              <div key={idx} className={classes.item}>
                <div className={classes.itemName}>{item.product}</div>
                <div className={classes.number}>x {item.number}</div>
                <div className={classes.price}>${item.price}</div>
              </div>
            ))}
            <div className={classes.line3}></div>
            <div className={classes.item}>
              <div className={classes.itemName}>Total</div>
              <div className={classes.price}>${total}</div>
            </div>
          </div>
        </div>

        <div className={classes.line1}></div>

        <div className={classes.transferSection}>
          <div className={classes.transferInformation}>
            Transfer information
          </div>
          <div className={classes.transferInfoContent}>
            {statusData.transferInformation}
          </div>
        </div>

        <div className={classes.paymentSection}>
          <div className={classes.paymentStatus}>Payment Status</div>
          <div className={classes.paymentStatusContainer}>
            {renderPaymentStatus()}
          </div>
        </div>

        <Component5_Property1Create
          className={classes.component10}
          disabled={statusData.paymentSatus === 0 && hasNotified}
          text={{
            create: <div className={classes.create}>
              {statusData.paymentSatus === 0 ? 'Notify' : 'Review'}
            </div>,
          }}
          onClick={statusData.paymentSatus === 0 ? handleNotifyClick : handleReviewClick}
        />

        {isReviewOpen && (
          <Review
            isOpen={isReviewOpen}
            onClose={handleReviewClick}
            hostId={user_id}
          />
        )}
      </div>
    </div>
  );
});

export default StatusComponent;
