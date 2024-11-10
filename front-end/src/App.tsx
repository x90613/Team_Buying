import { memo } from 'react';
import type { FC } from 'react';

import classes from './App.module.css';
import logo from '/assets/logo.png';
import UserImage from '/assets/User.png';
import SearchBar from './components/SearchBar/SearchBar';

interface Props {
  className?: string;
}
export const App: FC<Props> = memo(function App(props = {}) {
  const handleSearch = (query: string) => {
    console.log('Search query:', query); // 用於確認搜尋字串的輸出
    // 在這裡處理搜尋邏輯，例如發送 API 請求等
  };

  const handleAddClick = () => {
    alert('按下 + 按鈕！');
  };

  const handleUserClick = () => {
    alert('按下 user 按鈕！');
  };
  return (
    <>
    <div 
      className={`${classes.root}`}>
      <img
          className={classes.logo}
          src={logo}/>    
    </div>
    <div className={classes.searchContainer}>
      <SearchBar onSearch={handleSearch} />
    </div>
      <div>
        <button className={classes.AddButton} onClick={handleAddClick} >
          +
        </button>
      </div>
      <div>
        <button className={classes.UserButton} onClick={handleUserClick} >
        <img
          className={classes.userImage} src={UserImage}/>  
        </button>
      </div>
    </>
  );
});
