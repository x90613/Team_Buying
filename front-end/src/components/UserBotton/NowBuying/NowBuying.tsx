
import { FC, useRef, useState } from 'react';
import TeamBuying from '../TeamBuying';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
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
  const { token, username, userId, isLoggedIn } = useAuth();


  return (
    <>
      {data.map((item, index) => {
        const handleClick = (host_form_id:any, user_id:any) => {
          navigate(`/order-item/status/${host_form_id}/${user_id}`); // Navigate to '/order-item'
        };
      return(
        <TeamBuying
          key={index}
          name = {item.name}
          datetime = {item.datetime}
          status={item.status}
          hostFormID = {item.hostFormID}
          onClick={() => handleClick(item.hostFormID,userId)}
        />
        );
      })}
    </>
  );
};

export default NowBuying;
