
import { FC, useState } from 'react';
import HostSection from './HostSection';
import Review from './Review';

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

  const hostData = [
    {"name": "QQQ's TeamBuying", "datetime": "2024/12/13 22:00", "star": "1", "hostFormID": "0"},
    {"name": "XXX's TeamBuying", "datetime": "2024/12/13 22:00", "star": "2", "hostFormID": "1"},
    {"name": "SSS's TeamBuying", "datetime": "2024/12/13 22:00", "star": "3", "hostFormID": "2"},
    {"name": "ZZZ's TeamBuying", "datetime": "2024/12/13 22:00", "star": "4", "hostFormID": "3"}
  ]

  // get review of hostData based on hostFormID
  const reviewData = [
    {"review": "Faker1", "datetime": "2024/12/13 22:00", "star": "1", "content": "Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!23123","hostFormID": "123"},
    {"review": "Faker23", "datetime": "2024/12/13 22:00", "star": "2", "content": "Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!23123","hostFormID": "123"},
    {"review": "Faker456", "datetime": "2024/12/13 22:00", "star": "3", "content": "Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!23123","hostFormID": "123"},
    {"review": "Faker78910", "datetime": "2024/12/13 22:00", "star": "4", "content": "Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!23123","hostFormID": "123"},
    {"review": "Faker", "datetime": "2024/12/13 22:00", "star": "5", "content": "Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!23123","hostFormID": "123"},
    {"review": "Faker", "datetime": "2024/12/13 22:00", "star": "4", "content": "Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!23123","hostFormID": "123"},
    {"review": "Faker", "datetime": "2024/12/13 22:00", "star": "3", "content": "Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!23123","hostFormID": "123"},
    {"review": "Faker", "datetime": "2024/12/13 22:00", "star": "2", "content": "Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!Nice!!23123","hostFormID": "123"},
  ]

  const [reviewOfHost, setReviewOfHost] = useState<string | null>(null);
  const handleClick = (hostFormID: string) => {

    setReviewOfHost(hostFormID);
  };



  return (
    <>
      {reviewOfHost === null ? (
        hostData.map((item, index) => (
          <HostSection
          key = {index}
          name = {item.name}
          datetime = {item.datetime}
          star = {item.star as "1" | "2" | "3" | "4" | "5"}
          hostFormID = {item.hostFormID}
          handleClick = {handleClick}
          />
        ))
      ) : (
          reviewData.map((review, index) => (
            <Review
            key={index}
            review={review.review}
            datetime={review.datetime}
            star={review.star as "1" | "2" | "3" | "4" | "5"}
            content={review.content}
            />
          ))
      )}
    </>
  );
};

export default ReviewList;
