
import { FC, useRef, useState } from 'react';
import TeamBuying from '../TeamBuying';
import useUserHook from '../../../hooks/useUserHook';

interface NowHostingProps {
}

export const NowHosting: FC<NowHostingProps> = ({}) => {
  const { userNowHostingData } = useUserHook();

  return (
    <>
      {userNowHostingData?.map((item, index) => (
        <TeamBuying
        key={index}
        name = {item.name}
        datetime = {item.datetime}
        status={item.status}
        paymentStatus={item.status}
        hostFormID = {item.hostFormID}
        />
      ))}
    </>
  );
};

export default NowHosting;
