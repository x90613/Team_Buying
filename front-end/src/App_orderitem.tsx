import { memo } from 'react';
import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import classes from './App_orderitem.module.css';
import resets from './components/_resets.module.css';
import { OrderItem } from './components/OrderItem/OrderItem';
import { Order } from './components/ParticipantForm/ParticipantForm';
import { Unnamed as Status } from './components/Status/Status';
import { MenuList } from './components/MenuList/MenuList';




interface Props {
  className?: string;
}

export const App_orderitem: FC<Props> = memo(function App_orderitem(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <OrderItem />
      <MenuList className={classes.menuList} />
    </div>
  );
});
