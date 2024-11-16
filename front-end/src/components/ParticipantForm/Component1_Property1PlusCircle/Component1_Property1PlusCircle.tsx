import { memo } from 'react';
import type { FC, ReactNode, MouseEventHandler } from 'react';

import resets from '../../_resets.module.css';
import classes from './Component1_Property1PlusCircle.module.css';
import { VectorIcon } from './VectorIcon.js';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  swap?: {
    vector?: ReactNode;
  };
  onClick?: MouseEventHandler<HTMLDivElement>;
}
/* @figmaId 20:450 */
export const Component1_Property1PlusCircle: FC<Props> = memo(function Component1_Property1PlusCircle(props = {}) {
  return (
    <div
      className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}
      onClick={props.onClick}
    >
      <div className={classes.vector}>{props.swap?.vector || <VectorIcon className={classes.icon} />}</div>
    </div>
  );
});
