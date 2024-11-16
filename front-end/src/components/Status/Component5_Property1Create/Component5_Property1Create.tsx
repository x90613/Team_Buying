import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import classes from './Component5_Property1Create.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  text?: {
    create?: ReactNode;
  };
}
/* @figmaId 2:2020 */
export const Component5_Property1Create: FC<Props> = memo(function Component5_Property1Create(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      {props.text?.create != null ? props.text?.create : <div className={classes.create}>Create</div>}
    </div>
  );
});
