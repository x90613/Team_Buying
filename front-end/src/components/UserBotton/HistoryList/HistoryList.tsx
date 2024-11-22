
import { FC, useRef, useState } from 'react';
import styles from './HistoryList.module.css';
import TeamBuying from '../TeamBuying';

interface HistoryListProps {
}

export const HistoryList: FC<HistoryListProps> = ({}) => {
  // TODO: get History from backend
  // TODO: choose Status type

  const data = {
    host: [
      {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "status": "notyet", "hostFormID": "123"},
      {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "status": "done", "hostFormID": "123"}
    ],
    participant: [
      {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "status": "fail", "hostFormID": "123"},
      {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "status": "done", "hostFormID": "123"}
    ]
  };

  return (
    <>
      <label className={styles.label}>Host</label>
      {data.host.map((item, index) => (
        <TeamBuying
        key={index}
        name = {item.name}
        datetime = {item.datetime}
        status={item.status}
        hostFormID = {item.hostFormID}
        />
      ))}
      <label className={styles.label}>Particpant</label>
      {data.participant.map((item, index) => (
        <TeamBuying
        key={index}
        name = {item.name}
        datetime = {item.datetime}
        status={item.status}
        hostFormID = {item.hostFormID}
        />
      ))}
    </>
  );
};

export default HistoryList;
