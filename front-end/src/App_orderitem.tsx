import { memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { FC } from 'react';

import classes from './App_orderitem.module.css';
import resets from './components/_resets.module.css';
import { OrderItem } from './components/OrderItem/OrderItem.js';
import { Order } from './components/ParticipantForm/ParticipantForm';
import { Unnamed as Status } from './components/Status/Status';
import { MenuList } from './components/MenuList/MenuList.js';

interface Props {
  className?: string;
}

export const App: FC<Props> = memo(function App(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <OrderItem />
              <MenuList className={classes.menuList} />
            </>
          } />
          <Route path="/order" element={<Order />} />
          <Route path="/status" element={
            <>
              <Status />
              <MenuList className={classes.menuList} />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
});
