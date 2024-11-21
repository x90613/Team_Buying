
import { FC, useRef, useState } from 'react';
import styles from './Review.module.css';
import FiveStars from '/assets/Star/FiveStars.png';
import FourStars from '/assets/Star/FourStars.png';
import ThreeStars from '/assets/Star/ThreeStars.png';
import TwoStars from '/assets/Star/TwoStars.png';
import OneStar from '/assets/Star/OneStar.png';

interface ReviewProps {
  review: string;
  datetime: string;
  star: '1' | '2' | '3' | '4' | '5';
  content: string;
}

const Review: FC<ReviewProps> = ({review, datetime, star, content}) => {
  const starImage = {
    '1': OneStar,
    '2': TwoStars,
    '3': ThreeStars,
    '4': FourStars,
    '5': FiveStars,
  };

  return (
    <>
      <div className={styles.ReviewItem}>
        <div className={styles.ReviewItemTop}>
          <div className={styles.nameAndStar}>
            <span className={styles.name}>{review}</span>
            <img src={starImage[star]} className={styles.star}/>
          </div>
          <span className={styles.datetime}>{datetime}</span>
        </div>
        <span className={styles.content}>{content}</span>
      </div>
    </>
  );
};

export default Review;
