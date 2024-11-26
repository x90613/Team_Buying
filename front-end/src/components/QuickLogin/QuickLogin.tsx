
import { FC, useState } from 'react';
import styles from './QuickLogin.module.css';
import cross from '/assets/Cross_item.png'
import logo from '/assets/logo.png';
import eyeIcon from '/assets/Eye.png';
import useQuickLogin from '../../hooks/useQuickLogin';
import { useAuth } from '../../contexts/AuthContext';

interface QuickLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const QuickLogin: FC<QuickLoginProps> = ({ isOpen, onClose}) => {
  const { quickLogin, loading, error } = useQuickLogin();
  const { login } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!userName || !password) {
      alert('Please enter both username and password');
      return;
    }

    const response = await quickLogin(userName, password);
    if (response) {
      login(response.username, response.userId); // 更新全域登入狀態
      onClose(); // 登入成功後關閉對話框
    }
  };

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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className={styles.passwordContainer}>
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.inputField}/>

            <img
              src={showPassword ? eyeIcon : eyeIcon} // 切換圖標
              alt="Password Visibility"
              className={styles.eyeIcon}
              onClick={togglePasswordVisibility}
            />
            </div>
          <button type='submit' onClick={handleLogin} className={styles.loginButton}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default QuickLogin;
