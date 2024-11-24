import { FC, useState } from 'react';
import styles from './HostForm.module.css';
import cross from '/assets/Cross_item.png';  // Update path to match your project structure

interface HostFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  storeName: string;
  description: string;
  deadline: {
    year: string;
    month: string;
    day: string;
    time: string;
  };
  contactInfo: string;
  transferInfo: string;
  image: File | null;
  isPublic: boolean;
}

const HostForm: FC<HostFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<FormData>({
    title: "奶茶團購",
    storeName: "五十嵐",
    description: "一起來喝五十嵐，買五杯送一杯！",
    deadline: {
      year: "2024",
      month: "1",
      day: "31",
      time: "22:00"
    },
    contactInfo: "Line ID: drink123",
    transferInfo: "國泰世華 1234-5678-9012",
    image: null,
    isPublic: true
  });

  const [isOtherSelected, setIsOtherSelected] = useState(false); // 是否為 "Others"

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'Others') {
      setIsOtherSelected(true);
      setFormData({ ...formData, storeName: '' });
    } else {
      setIsOtherSelected(false);
      setFormData({ ...formData, storeName: event.target.value });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, storeName: event.target.value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData({ ...formData, image: event.target.files[0] }); // 保存上傳的圖片檔案
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const jsonData = {
      ...formData,
      image: formData.image ? formData.image.name : null // Only sending filename for demo
    };

    console.log('Form data:', JSON.stringify(jsonData, null, 2));
    // Here you would typically send the data to your backend
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
            <img className={styles.closeButton} src={cross}/>
        </button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />

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
                value={formData.storeName}
                onChange={handleInputChange}
                className={styles.selectField}
              />
            )}
            <div className={styles.othersContainer}>
              <label className={styles.publiclabel}>Others</label>
              <input
                type="checkbox"
                className={styles.checkbox2}
                checked={isOtherSelected}
                onChange={() => setIsOtherSelected(!isOtherSelected)}
              />
            </div>
          </div>

          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            className={styles.textareaField}
            placeholder="Descrption"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />

          <label className={styles.label}>Deadline</label>
          <div className={styles.deadlineContainer}>
            <input
              type="text"
              placeholder="2024"
              className={styles.dateField}
              value={formData.deadline.year}
              onChange={(e) => setFormData({
                ...formData,
                deadline: {...formData.deadline, year: e.target.value}
              })}
            />
            <select
              className={styles.dateField}
              value={formData.deadline.month}
              onChange={(e) => setFormData({
                ...formData,
                deadline: {...formData.deadline, month: e.target.value}
              })}
            >
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
            <input
              type="text"
              placeholder="2"
              className={styles.dateField}
              value={formData.deadline.day}
              onChange={(e) => setFormData({
                ...formData,
                deadline: {...formData.deadline, day: e.target.value}
              })}
            />
            <input
              type="text"
              placeholder="22:00"
              className={styles.dateField}
              value={formData.deadline.time}
              onChange={(e) => setFormData({
                ...formData,
                deadline: {...formData.deadline, time: e.target.value}
              })}
            />
          </div>

          <label className={styles.label}>Hoster Contact Information</label>
          <input
            type="text"
            name="contactInfo"
            className={styles.inputField}
            placeholder="ContactInfo"
            value={formData.contactInfo}
            onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
          />

          <label className={styles.label}>Transfer Information</label>
          <input
            type="text"
            name="transferInfo"
            className={styles.inputField}
            placeholder="TransferInfo"
            value={formData.transferInfo}
            onChange={(e) => setFormData({...formData, transferInfo: e.target.value})}
          />

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
              {formData.image && <p className={styles.label}>{formData.image.name}</p>}
            </div>
            <div className={styles.publicContainer}>
              <label className={styles.publiclabel}>Public</label>
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={() => setFormData({...formData, isPublic: !formData.isPublic})}
                className={styles.checkbox}
              />
            </div>
          </div>

          <button type="submit" className={styles.createButton}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default HostForm;
