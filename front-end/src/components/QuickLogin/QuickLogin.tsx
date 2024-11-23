
import { FC, useState } from 'react';
import styles from './QuickLogin.module.css';
import cross from '/assets/Cross_item.png'
import logo from '/assets/logo.png';
import eyeIcon from '/assets/Eye.png';

interface QuickLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const QuickLogin: FC<QuickLoginProps> = ({ isOpen, onClose, onLoginSuccess}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // 在這裡進行登入邏輯，例如 API 認證請求
    onLoginSuccess();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
            <img className={styles.closeButton} src={cross}/>
        </button>
        <img
          className={styles.logo}
          src={logo}/>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="User Name"
            required
            className={styles.inputField}
          />
          <div className={styles.passwordContainer}>
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className={styles.inputField}/>
            <img
              src={showPassword ? eyeIcon : eyeIcon} // 切換圖標
              alt="Password Visibility"
              className={styles.eyeIcon}
              onClick={togglePasswordVisibility}
            />
            </div>
          <button type='submit' className={styles.loginButton} onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default QuickLogin;
