import { FC, useState, useEffect } from 'react';
import styles from './HostForm.module.css';
import cross from '/assets/Cross_item.png';
import { useHostFormData } from '../../hooks/useHostFormData';

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
  const { hostFormData, loading, error } = useHostFormData();
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    storeName: "",
    description: "",
    deadline: {
      year: "",
      month: "",
      day: "",
      time: ""
    },
    contactInfo: "",
    transferInfo: "",
    image: null,
    isPublic: true
  });

  // Update form data when API data is received
  useEffect(() => {
    if (hostFormData) {
      const deadlineDate = new Date(hostFormData.deadTime);

      // Check if the store is in the predefined list
      const predefinedStores = ["龜記", "五十嵐"];
      const isOther = !predefinedStores.includes(hostFormData.storeName);

      setIsOtherSelected(isOther);
      setFormData({
        title: hostFormData.title,
        storeName: hostFormData.storeName,
        description: hostFormData.description,
        deadline: {
          year: deadlineDate.getFullYear().toString(),
          month: (deadlineDate.getMonth() + 1).toString(),
          day: deadlineDate.getDate().toString(),
          time: `${deadlineDate.getHours().toString().padStart(2, '0')}:${deadlineDate.getMinutes().toString().padStart(2, '0')}`
        },
        contactInfo: hostFormData.hostContactInformation,
        transferInfo: hostFormData.transferInformation,
        image: null,
        isPublic: hostFormData.open
      });
    }
  }, [hostFormData]);

  if (!isOpen) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: event.target.value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData({ ...formData, image: event.target.files[0] });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // 從 URL 獲取 hostformId
      const pathParts = window.location.pathname.split('/');
      const hostformId = pathParts[pathParts.length - 1];

      // 構建要發送的數據
      const submitData = {
        title: formData.title,
        storeName: formData.storeName,
        description: formData.description,
        deadTime: new Date(
          parseInt(formData.deadline.year),
          parseInt(formData.deadline.month) - 1,
          parseInt(formData.deadline.day),
          ...formData.deadline.time.split(':').map(Number)
        ).toISOString(),
        hostContactInformation: formData.contactInfo,
        transferInformation: formData.transferInfo,
        open: formData.isPublic
      };

      const response = await fetch(`http://localhost:9090/api/hostforms/${hostformId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        throw new Error('Failed to update host form');
      }

      // 如果有圖片，另外處理圖片上傳
      if (formData.image) {
        const formDataWithImage = new FormData();
        formDataWithImage.append('image', formData.image);

        const imageResponse = await fetch(`http://localhost:9090/api/hostforms/${hostformId}/image`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formDataWithImage
        });

        if (!imageResponse.ok) {
          throw new Error('Failed to upload image');
        }
      }

      onClose(); // 成功後關閉表單
    } catch (error) {
      console.error('Error updating host form:', error);
    }
  };

  // The rest of your render code remains the same...
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <img className={styles.closeButton} src={cross} alt="close" />
        </button>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Form fields remain the same... */}
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
              <select
                name="storeName"
                value={formData.storeName}
                onChange={handleStoreChange}
                className={styles.selectField}
              >
                <option value="">Select Store</option>
                <option value="龜記">龜記</option>
                <option value="五十嵐">五十嵐</option>
                <option value="Others">Others</option>
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
            className={styles.textareaField}
            placeholder="Description"
            value={formData.description}
            onChange={handleTextChange}
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
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Day"
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
            className={styles.inputField}
            placeholder="Contact Info"
            value={formData.contactInfo}
            onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
          />

          <label className={styles.label}>Transfer Information</label>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Transfer Info"
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
                className={styles.fileInput}
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
