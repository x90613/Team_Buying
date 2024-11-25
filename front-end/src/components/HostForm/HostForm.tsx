import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HostForm.module.css';
import cross from '/assets/Cross_item.png';

interface HostFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const HostForm: FC<HostFormProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(false);

  if (!isOpen) return null;

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'Others') {
      setIsOtherSelected(true);
      setStoreName('');
    } else {
      setIsOtherSelected(false);
      setStoreName(event.target.value);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleCreateClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page refresh
    onClose(); // Close the modal
    navigate('/order-item'); // Navigate to '/order-item'
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <img className={styles.closeButton} src={cross} alt="Close" />
        </button>
        <form className={styles.form} onSubmit={handleCreateClick}>
          <label className={styles.label}>Title</label>
          <input type="text" name="title" className={styles.inputField} placeholder="Title" />

          <label className={styles.label}>Store Name</label>
          <div className={styles.storeContainer}>
            {!isOtherSelected ? (
              <select name="storeName" onChange={handleStoreChange} className={styles.selectField}>
                <option value="">Select Store</option>
                <option value="龜記">龜記</option>
                <option value="五十嵐">五十嵐</option>
              </select>
            ) : (
              <input
                type="text"
                placeholder="Store Name"
                value={storeName}
                onChange={handleInputChange}
                className={styles.selectField}
              />
            )}
            <label className={styles.publiclabel}>Others</label>
            <input
              type="checkbox"
              className={styles.checkbox2}
              checked={isOtherSelected}
              onChange={() => setIsOtherSelected(!isOtherSelected)}
            />
          </div>

          <label className={styles.label}>Description</label>
          <textarea name="description" className={styles.textareaField} placeholder="Description" />

          <label className={styles.label}>Deadline</label>
          <div className={styles.deadlineContainer}>
            <input type="text" placeholder="2024" className={styles.dateField} />
            <select name="month" className={styles.dateField}>
              <option value="">Month</option>
              {/* Month options */}
            </select>
            <input type="text" placeholder="2" className={styles.dateField} />
            <input type="text" placeholder="22:00" className={styles.dateField} />
          </div>

          <label className={styles.label}>Hoster Contact Information</label>
          <input type="text" name="contactInfo" className={styles.inputField} placeholder="ContactInfo" />

          <label className={styles.label}>Transfer Information</label>
          <input type="text" name="transferInfo" className={styles.inputField} placeholder="TransferInfo" />

          <div className={styles.uploadAndPublicContainer}>
            <div className={styles.uploadContainer}>
              <label htmlFor="upload-image" className={styles.uploadButton}>
                Upload Image
              </label>
              <input
                type="file"
                id="upload-image"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
              {image && <p className={styles.label}>{image.name}</p>}
            </div>
            <div className={styles.publicContainer}>
              <label className={styles.publiclabel}>Public</label>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
                className={styles.checkbox}
              />
            </div>
          </div>
          <button type="submit" className={styles.createButton}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default HostForm;
