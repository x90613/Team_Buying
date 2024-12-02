import { FC } from 'react';
import TeamBuying from '../TeamBuying';
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
        hostformId = {item.hostformId}
        hostId = {item.hostId}
        />
      ))}
    </>
  );
};

export default NowBuying;
