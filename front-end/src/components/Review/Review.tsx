
import { FC, useState } from 'react';
import styles from './Review.module.css';
import cross from '/assets/Cross_item.png'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useFeedback from '../../hooks/useFeedback';
import { useParams } from 'react-router-dom';
interface ReviewProps {
  isOpen: boolean;
  onClose: () => void;
  hostId: string;
}

const ReviewLogin: FC<ReviewProps> = ({ isOpen, onClose, hostId}) => {
    const { createFeedback, loading, error, success } = useFeedback();
    const { host_form_id, user_id } = useParams();

    const [rating, setRating] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    const navigate = useNavigate();
    const { token, username, userId, isLoggedIn } = useAuth();
    if (!isOpen) return null;

    const handleRating = (index: number) => {
        setRating(index + 1); // 設定選擇的評分，index + 1 表示從1開始的星星數量
    };

    const handleConfirm = async ()  => {
        if (!isLoggedIn) {
            alert('請先登入！');
            return;
          }
        if (userId == null|| hostId == null|| host_form_id == null) {
            alert('參數讀取錯誤');
            return;
          }
        console.log('host_form_id', host_form_id, 'user_id', user_id, 'hostId', hostId, 'score', rating, 'content', reviewContent);
        const formData = {
            hostId:hostId, // 來自父組件
            userId:userId, // 從 AuthContext 獲取
            hostFormId: host_form_id, // 來自父組件
            score: rating,
            content: reviewContent,
            };
        const result = await createFeedback(formData);
        onClose();
        navigate('/');
    };
    return (
        <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={onClose}>
                <img className={styles.closeButton} src={cross}/>
            </button>
            <div className={styles.wrapper}>
            <h2 className={styles.title}>{username}'s Review</h2>
            <div className={styles.stars}>
                {Array(5).fill(0).map((_, index) => (
                    <span
                    key={index}
                    className={index < rating ? styles.filledStar : styles.emptyStar}
                    onClick={() => handleRating(index)}
                    >
                    ★
                    </span>
                ))}
            </div>
            <textarea
                className={styles.textarea}
                placeholder="Review"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)} // 更新回饋內容
                />
            {/* <button type='submit' className={styles.confirmButton}>Confirm</button> */}
            <button type='submit' className={styles.confirmButton} onClick={handleConfirm}>
                        Confirm
                    </button>
            </div>
            </div>
        </div>
    );
    };

export default ReviewLogin;
