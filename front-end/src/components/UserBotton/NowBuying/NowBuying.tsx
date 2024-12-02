
import { FC, useRef, useState } from 'react';
import TeamBuying from '../TeamBuying';
import { useNavigate } from 'react-router-dom';
import useUserHook from '../../../hooks/useUserHook';

interface NowBuyingProps {
}

export const NowBuying: FC<NowBuyingProps> = ({}) => {
  const { userNowBuyingData } = useUserHook();

  return (
    <>
      {userNowBuyingData?.map((item, index) => (
        <TeamBuying
        key={index}
        name = {item.name}
        datetime = {item.datetime}
        status={item.paymentStatus}
        hostFormID = {item.hostFormID}
        />
      ))}
    </>
  );
};

export default NowBuying;
