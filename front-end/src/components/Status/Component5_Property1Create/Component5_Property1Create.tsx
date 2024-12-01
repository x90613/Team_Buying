import { memo } from 'react';
import type { FC, ReactNode, MouseEventHandler, CSSProperties } from 'react';

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
  onClick?: (e: React.MouseEvent) => void;
  style?: CSSProperties;
  disabled?: boolean;
}

export const Component5_Property1Create: FC<Props> = memo(function Component5_Property1Create(props = {}) {
  const rootStyle: CSSProperties = {
    ...props.style,
    backgroundColor: props.disabled ? '#808080' : '#0d99ff',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <div 
      className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}
      onClick={(e) => {
        console.log('Button clicked', props.disabled);
        if (!props.disabled && props.onClick) {
          props.onClick(e);
        }
      }}
      style={rootStyle}
    >
      {props.text?.create != null ? props.text?.create : <div className={classes.create}>Create</div>}
    </div>
  );
});