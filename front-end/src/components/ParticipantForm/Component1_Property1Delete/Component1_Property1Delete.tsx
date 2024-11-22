import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import classes from './Component1_Property1Delete.module.css';
import { VectorIcon } from './VectorIcon.js';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  swap?: {
    vector?: ReactNode;
  };
  onClick?: () => void; // 添加 onClick 屬性
}
/* @figmaId 20:470 */
export const Component1_Property1Delete: FC<Props> = memo(function Component1_Property1Delete(props = {}) {
  return (
    <div 
      className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}
      onClick={props.onClick} // 添加 onClick 事件處理器
    >
      <div className={classes.vector}>{props.swap?.vector || <VectorIcon className={classes.icon} />}</div>
    </div>
  );
});
