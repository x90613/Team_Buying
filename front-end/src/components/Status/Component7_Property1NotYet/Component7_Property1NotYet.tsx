import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Component7_Property1NotYet.module.css';
import { PanoramaFisheyeIcon } from './PanoramaFisheyeIcon.js';

interface Props {
  className?: string;
}
/* @figmaId 21:1251 */
export const Component7_Property1NotYet: FC<Props> = memo(function Component7_Property1NotYet(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.className || ''} ${classes.root}`}>
      <div className={classes.notYet}>Not Yet</div>
      <div className={classes.panoramaFisheye}>
        <PanoramaFisheyeIcon className={classes.icon} />
      </div>
    </div>
  );
});
