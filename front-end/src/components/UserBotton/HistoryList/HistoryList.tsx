
import { FC, useRef, useState } from 'react';
import styles from './HistoryList.module.css';
import TeamBuying from '../TeamBuying';
import useUserHook from '../../../hooks/useUserHook';

interface HistoryListProps {
}

export const HistoryList: FC<HistoryListProps> = ({}) => {
  const { userHistoryListData } = useUserHook();

  return (
    <>

      {
        (userHistoryListData?.host?.length || 0)> 0 && (
          <>
            <label className={styles.label}>Host</label>
            {userHistoryListData?.host.map((item, index) => (
              <TeamBuying
                key={index}
                name={item.name}
                datetime={item.datetime}
                status={item.status}
                hostformId={item.hostformId}
                hostId={item.hostId}
                isHost={true}
              />
            ))}
          </>
        )
      }
      {
        (userHistoryListData?.participant?.length || 0) > 0 && (
          <>
            <label className={styles.label}>Particpant</label>
            {userHistoryListData?.participant.map((item, index) => (
              <TeamBuying
                key={index}
                name={item.name}
                datetime={item.datetime}
                status={item.paymentStatus}
                hostformId={item.hostformId}
                hostId={item.hostId}
                isHost={false}
              />
            ))}
          </>
        )
      }
    </>
  );
};

export default HistoryList;
