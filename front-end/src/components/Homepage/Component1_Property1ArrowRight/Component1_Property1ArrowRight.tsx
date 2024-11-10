import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Component1_Property1ArrowRight.module.css';
import { VectorIcon } from './VectorIcon.js';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}
/* @figmaId 2:814 */
export const Component1_Property1ArrowRight: FC<Props> = memo(function Component1_Property1ArrowRight(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.vector}>
        <VectorIcon className={classes.icon} />
      </div>
    </div>
  );
});
