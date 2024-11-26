import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HostForm.module.css';
import cross from '/assets/Cross_item.png'
import useCreateHostForm from '../../hooks/useCreateHostForm';
import useGetMenu from '../../hooks/useGetMenu'; // 動態獲取菜單

interface HostFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const HostForm: FC<HostFormProps> = ({ isOpen, onClose}) => {
  const navigate = useNavigate();
  const { createHostForm, loading, error, success } = useCreateHostForm();
  const { menus, loading: menuLoading, error: menuError } = useGetMenu();


  const [formData, setFormData] = useState({
    title: '',
    others: false,
    storeName: '',
    description: '',
    hostContactInformation: '',
    transferInformation: '',
    image: null as File | null,
    menuId: -1,
    open: false,
  });



  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    // 檢查是否為 checkbox 類型
    if (event.target instanceof HTMLInputElement && event.target.type === "checkbox") {
      const checked = event.target.checked;

      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,

      }));
    } else {
      setFormData((prevData) => {
        if (name === "storeName" && prevData.others) {
          return {
            ...prevData,
            [name]: value,
            menuId: -1,
          };
        }

        return {
          ...prevData,
          [name]: value,
        };
      });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // 提取 files
    if (!files || !files[0]) return; // 添加這行檢查
    if (files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  const [dateParts, setDateParts] = useState({
    year: '',
    month: '',
    day: '',
    time: '',
  });

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDateParts((prevParts) => ({
      ...prevParts,
      [name]: value,
    }));
  };

  const formatDeadline = () => {
    const { year, month, day, time } = dateParts;

    if (!year || !month || !day || !time) {
      return ''; // 提示用戶輸入完整數據
    }

    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');
    console.log(`${year}-${formattedMonth}-${formattedDay}T${time}:00`);
    return `${year}-${formattedMonth}-${formattedDay}T${time}:00`;
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const deadline = formatDeadline();
    // 格式化 deadline
    if (!deadline) {
      alert('Please complete all the date fields!');
      return;
    }
    const preparedData = {
      ...formData,
      deadline, // 格式化的 deadline
      image: formData.image ? await toBase64(formData.image) : '', // 將圖片轉為 base64
    };

    await createHostForm(preparedData);

    if (success) {
      alert('Host form created successfully!');
      onClose(); // 提交成功後關閉表單
    }
  };

  const handleCreateClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page refresh
    onClose(); // Close the modal
    navigate('/order-item'); // Navigate to '/order-item'
  };
  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <img className={styles.closeButton} src={cross} alt="Close" />
        </button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.inputField}
            placeholder="Title"
            required
          />

          <label className={styles.label}>Store Name</label>
          <div className={styles.storeContainer}>
            {!formData.others ? (
              <select
                name="menuId"
                value={formData.menuId}
                onChange={handleChange}
                className={styles.selectField}
                required
              >
                <option value="">Select Store</option>
                {menuLoading && <option>Loading...</option>}
                {menuError && <option>Error loading menus</option>}
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="storeName"
                placeholder="Store Name"
                value={formData.storeName}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            )}
            <label className={styles.publiclabel}>
              Others
              <input
                type="checkbox"
                checked={formData.others}
                onChange={handleChange}
                name="others"
                className={styles.checkbox}
              />
            </label>
          </div>

          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textareaField}
            placeholder="Description"
            required
          />

          <label className={styles.label}>Deadline</label>
          <div className={styles.deadlineContainer}>
            <input type="text" name='year' placeholder="2024" value={dateParts.year} onChange={handleDateChange} className={styles.dateField} />
            <select name="month" value={dateParts.month} onChange={handleDateChange} className={styles.dateField} required>
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
            <input type="text" name='day' value={dateParts.day} onChange={handleDateChange} placeholder="2" className={styles.dateField} required/>
            <input type="text" name="time" placeholder="22:00" value={dateParts.time} className={styles.dateField} onChange={handleDateChange} required/>
          </div>

          <label className={styles.label}>Hoster Contact Information</label>
          <input
            type="text"
            name="hostContactInformation"
            value={formData.hostContactInformation}
            onChange={handleChange}
            className={styles.inputField}
            placeholder="Contact Info"
            required
          />

          <label className={styles.label}>Transfer Information</label>
          <input
            type="text"
            name="transferInformation"
            value={formData.transferInformation}
            onChange={handleChange}
            className={styles.inputField}
            placeholder="Transfer Info"
            required
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
                name="open"
                checked={formData.open}
                onChange={handleChange}
                className={styles.checkbox}
              />
            </div>
          </div>

          <button type="submit" className={styles.createButton} disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </button>
          {error && <p className={styles.errorMessage}>Error: {error}</p>}
          {success && <p className={styles.successMessage}>Host form created successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default HostForm;
