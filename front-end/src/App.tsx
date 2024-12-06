import { memo } from 'react';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import classes from './App.module.css';
import logo from '/assets/logo.png';
import UserImage from '/assets/User.png';
import SearchBar from './components/SearchBar/SearchBar';
import QuickLogin from './components/QuickLogin/QuickLogin';
import UserBotton from './components/UserBotton/UserBotton';
import HostForm from './components/HostForm/HostForm';
import Review from './components/Review/Review';
import Activity from './components/Activity/Activity';
import useTeamBuying from './hooks/useTeamBuying';
import {App_orderitem} from './App_orderitem';
import { StatusComponent } from './components/Status/Status';
import { useAuth } from './contexts/AuthContext';
import { useNotification } from './hooks/useNotification'; // Add this import

interface Props {
  className?: string;
}
export const App: FC<Props> = memo(function App(props = {}) {

  const { teamBuyings, loading, error } = useTeamBuying();
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { token, username, userId, isLoggedIn } = useAuth();

  useNotification(userId, (notification) => {
    alert(`${notification.userName} has made a payment!`);
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddClick = () => {
    setIsAddOpen(!isAddOpen);
  };

  const handleUserClick = () => {
    setIsUserOpen(!isUserOpen);
  };
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = teamBuyings.filter((activity) =>
    activity.store_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.title.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <Router>
      <Routes>
        {/* 主頁面路由 */}
        <Route
          path="/"
          element={
            <div className={classes.root}>
              <img className={classes.logo} src={logo} />

              <div className={classes.searchContainer}>
                <SearchBar onSearch={handleSearch} />
              </div>
              <div className={classes.activityContainer}>
                <div className={classes.activityGrid}>
                {filteredActivities.map((activity, index) => {
                  const imageSrc = activity.image || activity.menu_store_img || "n";
                  return(
                  <Activity
                    key={index}
                    id={activity.id}
                    host_id={activity.host_id}
                    hoster_name={activity.user_name}
                    contactInformation={activity.host_contact_information}
                    transferInformation={activity.transfer_information}
                    image={imageSrc}
                    storeName={activity.store_name}
                    title={activity.title}
                    description={activity.description}
                    feedbackPoint={activity.averageFeedbackScore}
                    deadline={activity.dead_time}
                    participants_num={activity.participantCount}
                  />
                )})}
                </div>
              </div>
              <div>
                <button className={classes.AddButton} onClick={handleAddClick}>
                +
                </button>
                  {isAddOpen &&
                  (isLoggedIn?(
                    <HostForm isOpen={isAddOpen} onClose={handleAddClick}></HostForm>
                  ):(
                    <QuickLogin isOpen={isAddOpen} onClose={handleAddClick}></QuickLogin>
                  ))}
              </div>
              <div>
                <button className={classes.UserButton} onClick={handleUserClick}>
                  <img className={classes.userImage} src={UserImage} />
                </button>
                {isUserOpen &&
                  (isLoggedIn ? (
                    <UserBotton isOpen={isUserOpen} onClose={handleUserClick}></UserBotton>
                  ) : (
                    <QuickLogin isOpen={isUserOpen} onClose={handleUserClick}></QuickLogin>
                  ))}
              </div>
            </div>
          }
        />
        {/* 訂單頁面路由 */}
        <Route path="/order-item/:host_id/:host_form_id" element={<App_orderitem />} />
        <Route path="/order-item/status/:host_form_id/:user_id" element={<StatusComponent />} />
      </Routes>
    </Router>
  );
});
