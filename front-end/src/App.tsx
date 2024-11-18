import { memo } from 'react';
import type { FC } from 'react';
import { useState } from 'react';
import classes from './App.module.css';
import logo from '/assets/logo.png';
import UserImage from '/assets/User.png';
import SearchBar from './components/SearchBar/SearchBar';
import QuickLogin from './components/QuickLogin/QuickLogin';
import UserBotton from './components/UserBotton/UserBotton';
import HostForm from './components/HostForm/HostForm';
import Review from './components/Review/Review';
import Activity from './components/Activity/Activity';

import { activities } from './micmicData';

interface Props {
  className?: string;
}
export const App: FC<Props> = memo(function App(props = {}) {
  const handleSearch = (query: string) => {
    console.log('Search query:', query); // 用於確認搜尋字串的輸出
    // 在這裡處理搜尋邏輯，例如發送 API 請求等
  };

  const handleAddClick = () => {
    setIsAddOpen(!isAddOpen);
  };

  const handleUserClick = () => {
    setIsUserOpen(!isUserOpen);
  };
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);




  return (
    <>
    <div className={classes.root}>
      <img
          className={classes.logo}
          src={logo}/>

    <div className={classes.searchContainer}>
      <SearchBar onSearch={handleSearch} />

    </div>
    <div className={classes.activityContainer}>
    <div className={classes.activityGrid}>
        {activities.map((activity, index) => (
          <Activity
            key={index}
            hoster_name={activity.hoster_name}
            contactInformation={activity.contactInformation}
            transferInformation={activity.transferInformation}
            image={activity.image}
            storeName={activity.storeName}
            description={activity.description}
            feedbackPoint={activity.feedbackPoint}
            deadline={activity.deadline}
            participants_num={activity.participants_num}
          />
        ))}
      </div>
      </div>
      <div>
        <button className={classes.AddButton} onClick={handleAddClick} >
          +
          <HostForm isOpen={isAddOpen} onClose={handleAddClick}></HostForm>
        </button>
      </div>
      <div>
        <button className={classes.UserButton} onClick={handleUserClick} >
        <img
          className={classes.userImage} src={UserImage}/>
          {/* <QuickLogin isOpen={isUserOpen} onClose={handleUserClick}></QuickLogin> */}
          <UserBotton isOpen={isUserOpen} onClose={handleUserClick}></UserBotton>
          {/* <Review isOpen={isUserOpen} onClose={handleUserClick}></Review> */}
        </button>
      </div>
      </div>
    </>
  );
});
