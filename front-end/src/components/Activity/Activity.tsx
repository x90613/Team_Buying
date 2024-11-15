import { FC, useState } from 'react';
import styles from './Activity.module.css';
import cross from '/assets/Cross_item.png'

export interface ActivityProps {
  hoster_name: string;
  contactInformation: string;
  transferInformation: string;
  image: string;
  storeName: string;
  description: string;
  feedbackPoint: number;
  deadline: Date;
  participants_num: number;
}

const Activity: FC<ActivityProps> = ({ hoster_name, contactInformation, transferInformation, image, storeName, description, feedbackPoint, deadline, participants_num }) => {
    const formattedDeadline = deadline.toLocaleString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={`${styles.star} ${index < Math.round(feedbackPoint) ? styles.filled : ''}`}
          >
           ★
          </span>
        ));
      };
      const [isInfoOpen, setIsInfoOpen] = useState(false);
      const handleInfoClick = () => {
        setIsInfoOpen(true);
      };
    
      const closeInfo = () => {
        setIsInfoOpen(false);
      };
  return (
    <div className={styles.activityCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={storeName} className={styles.activityImage} />
        <button className={styles.infoButton} onClick={handleInfoClick} >i</button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.storeName}>{storeName}</h3>
        <button className={styles.joinButton}>Join</button>
      </div>
      <div className={styles.footer}>
        <div className={styles.rating}>
          {renderStars()}
          <span className={styles.feedbackPoint}>{feedbackPoint}</span>
        </div>
        <div className={styles.participants}>
          {participants_num} person joined
        </div>
      </div>
      {isInfoOpen && (
        <div className={styles.modalOverlay} onClick={closeInfo}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeInfo}>
            <img className={styles.closeButton} src={cross}/>
              </button>
              <div className={styles.modalImageWrapper}>
                <img src={image} alt={storeName} className={styles.modalImage} />
                <div className={styles.modalImageOverlay}></div>
              </div>
              <div className={styles.wrapper}>
                <h2 className={styles.modalTitle}>{storeName}</h2>
                <p className={styles.modalDescription}>{description}</p>
                <hr className={styles.separator} />
                <div className={styles.modalInfo}>
                <div className={styles.rowContainer}>
                  <p className={styles.modalHost}>{hoster_name} 's TeamBuying</p>
                  <p className={styles.modalDeadline}>{formattedDeadline}</p>
                </div>
                <p className={styles.modalContactTitle}>Hoster Contact Information</p>
                <a href={`tel:${contactInformation}`} className={styles.modalContactLink}>link</a>
                <p className={styles.modalTransferInfo}>Transfer information</p>
                <p className={styles.modalTransferDetails}>{transferInformation}</p>
              </div>
              <button className={styles.confirmButton} onClick={closeInfo}>Confirm</button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
