import { memo } from 'react';
import type { FC } from 'react';

import classes from './App.module.css';
import logo from '/assets/logo.png';

interface Props {
  className?: string;
}
export const App: FC<Props> = memo(function App(props = {}) {
  return (
    <div 
      className={`${classes.root}`}
      style={{backgroundColor:'linear-gradient(180deg, #f8fcff, #e5ecee)'}}>
    <img
        className={classes.logo}
        src={logo}/>    
    </div>
  );
});
