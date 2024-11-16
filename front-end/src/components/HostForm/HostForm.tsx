import { FC, useState } from 'react';
import styles from './HostForm.module.css';
import cross from '/assets/Cross_item.png'

interface HostFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const HostForm: FC<HostFormProps> = ({ isOpen, onClose}) => {

  if (!isOpen) return null;
  const [storeName, setStoreName] = useState(''); // Store Name 的值
  const [isOtherSelected, setIsOtherSelected] = useState(false); // 是否為 "Others"
  const [image, setImage] = useState<File | null>(null); // 儲存上傳的圖片檔案
  const [isPublic, setIsPublic] = useState(false);

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
      setImage(event.target.files[0]); // 保存上傳的圖片檔案
    }
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
            <img className={styles.closeButton} src={cross}/>
        </button>
        <form className={styles.form}>
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
            <label className={styles.publiclabel}>
              Others
            </label>
            <input type="checkbox" className={styles.checkbox2} checked={isOtherSelected} onChange={() => setIsOtherSelected(!isOtherSelected)} />
          </div>

          <label className={styles.label}>Description</label>
          <textarea name="description" className={styles.textareaField} placeholder="Descrption"/>

          <label className={styles.label}>Deadline</label>
          <div className={styles.deadlineContainer}>
            <input type="text" placeholder="2024" className={styles.dateField} />
            <select name="storeName" onChange={handleStoreChange} className={styles.dateField}>
                <option value="">Month</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            <input type="text" placeholder="2" className={styles.dateField} />
            <input type="text" placeholder="22:00" className={styles.dateField} />
          </div>

          <label className={styles.label}>Hoster Contact Information</label>
          <input type="text" name="contactInfo" className={styles.inputField} placeholder="ContactInfo"/>

          <label className={styles.label}>Transfer Information</label>
          <input type="text" name="transferInfo" className={styles.inputField} placeholder="TransferInfo"/>

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
                className={styles.fileInput} // 隱藏檔案選擇按鈕
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

          <button type="submit" className={styles.createButton}>Create</button>
        </form>
      </div>
    </div>
  );
};

export default HostForm;
