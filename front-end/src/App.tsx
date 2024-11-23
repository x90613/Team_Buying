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
import useTeamBuying from './hooks/useTeamBuying';

import { activities as allActivities } from './micmicData';

interface Props {
  className?: string;
}
export const App: FC<Props> = memo(function App(props = {}) {

  const { teamBuyings, loading, error } = useTeamBuying();
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
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  console.log(teamBuyings);
  const filteredActivities = teamBuyings.filter((activity) =>
    activity.store_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {filteredActivities.map((activity, index) => {
          const imageSrc = activity.img || activity.menu_store_img || "n";
          return(
          <Activity
            key={index}
            hoster_name={activity.user_name}
            contactInformation={activity.contact_information}
            transferInformation={activity.transfer_information}
            image={imageSrc}
            storeName={activity.store_name}
            description={activity.description}
            feedbackPoint={activity.averageFeedbackScore}
            deadline={activity.dead_time}
            participants_num={activity.participantCount}
          />
        )})}
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
          <QuickLogin isOpen={isUserOpen} onClose={handleUserClick}></QuickLogin>
          {/* <UserBotton isOpen={isUserOpen} onClose={handleUserClick}></UserBotton> */}
          {/* <Review isOpen={isUserOpen} onClose={handleUserClick}></Review> */}
        </button>
      </div>
      </div>
    </>
  );
});
