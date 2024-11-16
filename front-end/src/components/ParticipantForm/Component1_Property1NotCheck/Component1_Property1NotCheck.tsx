import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './Component1_Property1NotCheck.module.css';

interface Props {
  className?: string;
  onClick?: () => void;
  isChecked?: boolean;
}

export const Component1_Property1NotCheck: FC<Props> = memo(function Component1_Property1NotCheck(props = {}) {
  return (
    <div 
      className={`${resets.clapyResets} ${props.className || ''} ${props.isChecked ? classes.checked : ''} ${classes.root}`}
      onClick={props.onClick}
    >
      {props.isChecked ? '✓' : ''}
    </div>
  );
});
