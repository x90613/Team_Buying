import { memo, useEffect } from 'react';
import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import useReadMenu from '../../hooks/useReadMenu';  // 根據實際路徑調整
import resets from '../_resets.module.css';
import classes from './Menu.module.css';
import { MenuLeftIcon } from './MenuLeftIcon.js';
import { MenuRightIcon } from './MenuRightIcon.js';

interface Props {
  className?: string;
}

export const Menu1: FC<Props> = memo(function Menu1(props = {}) {
  const { host_form_id } = useParams();
  const { menuData, loading, error } = useReadMenu();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.frame16} />
      {menuData?.img && (
        <div
          className={classes.menuImage}
          style={{
            backgroundImage: `url(${menuData.img})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />
      )}
      <div className={classes.menuRight}>
        <MenuRightIcon className={classes.icon2} />
      </div>
      <div className={classes.menuLeft}>
        <MenuLeftIcon className={classes.icon3} />
      </div>
    </div>
  );
});
