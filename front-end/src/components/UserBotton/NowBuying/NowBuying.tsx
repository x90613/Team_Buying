
import { FC, useRef, useState } from 'react';
import TeamBuying from '../TeamBuying';
import { useNavigate } from 'react-router-dom';

interface NowBuyingProps {
}

export const NowBuying: FC<NowBuyingProps> = ({}) => {
  const navigate = useNavigate();
  const data = [
    {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "status": "notyet", "hostFormID": "123"},
    {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "status": "done", "hostFormID": "123"},
    {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "status": "fail", "hostFormID": "123"},
    {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "status": "done", "hostFormID": "123"}
  ]



  return (
    <>
      {data.map((item, index) => {
        const handleClick = () => {
          navigate('/order-item/status'); // Navigate to '/order-item'
        };
      return(
        <TeamBuying
          key={index}
          name = {item.name}
          datetime = {item.datetime}
          status={item.status}
          hostFormID = {item.hostFormID}
          onClick={handleClick}
        />
        );
      })}
    </>
  );
};

export default NowBuying;
