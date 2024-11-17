import { memo, useState, useEffect } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from './Menu1.module.css';
import { MenuLeftIcon } from './MenuLeftIcon.js';
import { MenuRightIcon } from './MenuRightIcon.js';
import { VectorIcon } from './VectorIcon.js';

interface Props {
  className?: string;
}
/* @figmaId 2:2190 */
export const Menu1: FC<Props> = memo(function Menu1(props = {}) {
  const [currentComponent, setCurrentComponent] = useState(0);
  const [currentImage, setCurrentImage] = useState(1);  // Add this line

  useEffect(() => {
    console.log('Component switched to:', currentComponent);
  }, [currentComponent]);

  const handleMenuRightClick = () => {
    setCurrentComponent((prev) => (prev + 1) % 2);
    setCurrentImage((prev) => prev === 1 ? 2 : 1);  // Add this line
  };

  const handleMenuLeftClick = () => {
    setCurrentComponent((prev) => (prev - 1 + 2) % 2);
    setCurrentImage((prev) => prev === 1 ? 2 : 1);  // Add this line
  };

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.frame16}>
      </div>
      <div className={classes[`image${currentImage}`]}></div>
      <div className={classes.menuRight} onClick={handleMenuRightClick}>
        <MenuRightIcon className={classes.icon2} />
      </div>
      <div className={classes.menuLeft} onClick={handleMenuLeftClick}>
        <MenuLeftIcon className={classes.icon3} />
      </div>
    </div>
  );
});
