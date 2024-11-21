
import { FC, useRef, useState } from 'react';
import TeamBuying from '../TeamBuying';

interface NowBuyingProps {
}

export const NowBuying: FC<NowBuyingProps> = ({}) => {
  const data = [
    {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "status": "notyet", "hostFormID": "123"},
    {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "status": "done", "hostFormID": "123"},
    {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "status": "fail", "hostFormID": "123"},
    {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "status": "done", "hostFormID": "123"}
  ]

  return (
    <>
      {data.map((item, index) => (
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

export default NowBuying;
