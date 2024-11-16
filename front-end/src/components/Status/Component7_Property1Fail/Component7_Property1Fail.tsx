import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import { AlphaXCircleOutlineIcon } from './AlphaXCircleOutlineIcon.js';
import classes from './Component7_Property1Fail.module.css';

interface Props {
  className?: string;
}
/* @figmaId 21:1252 */
export const Component7_Property1Fail: FC<Props> = memo(function Component7_Property1Fail(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.className || ''} ${classes.root}`}>
      <div className={classes.fail}>Fail</div>
      <div className={classes.alphaXCircleOutline}>
        <AlphaXCircleOutlineIcon className={classes.icon} />
      </div>
    </div>
  );
});
