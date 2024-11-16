import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import { Component1_Property1ArrowDownD } from '../Component1_Property1ArrowDownD/Component1_Property1ArrowDownD.js';
import classes from './Component3_Property1Frame18.module.css';
import { VectorIcon } from './VectorIcon.js';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  hide?: {
    frame21?: boolean;
  };
}
/* @figmaId 2:1885 */
export const Component3_Property1Frame18: FC<Props> = memo(function Component3_Property1Frame18(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      {!props.hide?.frame21 && (
        <div className={classes.frame21}>
          <div className={classes.frame22}></div>
        </div>
      )}
      <Component1_Property1ArrowDownD
        className={classes.component1}
        swap={{
          vector: <VectorIcon className={classes.icon} />,
        }}
      />
      <input type="text" className={classes.component3Input} placeholder="Enter value" />
    </div>
  );
});
