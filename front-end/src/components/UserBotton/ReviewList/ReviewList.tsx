
import { FC, useEffect, useState } from 'react';
import HostSection from './HostSection';
import Review from './Review';
import useUserHook from '../../../hooks/useUserHook';

interface ReviewListProps {
}

export const ReviewList: FC<ReviewListProps> = ({}) => {
  // Structure of hostData and reviewData
  // host section 1
  // -> review 1
  // -> review 2
  // host section 2
  // -> review 1
  // -> review 2
  // ...

  const { userReviewListData, userReviewData, fetchReviews } = useUserHook();

  // get review of hostData based on hostFormID

  const [reviewOfHost, setReviewOfHost] = useState<string | null>(null);
  const handleClick = (hostFormID: string) => {
    setReviewOfHost(hostFormID);
    fetchReviews(hostFormID);
  };

  return (
    <>
      {reviewOfHost === null ? (
        userReviewListData && userReviewListData.map((item, index) => (
          <HostSection
          key = {index}
          name = {item.name}
          datetime = {item.datetime}
          star = {item.star}
          hostFormID = {item.hostFormId}
          handleClick = {() => handleClick(item.hostFormId)}
          />
        ))
      ) : (
        userReviewData?.map((review, index) => (
            <Review
            key={index}
            review={review.name}
            datetime={review.datetime}
            star={review.star}
            content={review.content}
            />
          ))
      )}
    </>
  );
};

export default ReviewList;
