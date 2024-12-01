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
  onClick?: () => void;
  error?: string | null;
}

export const Component5_Property1Create: FC<Props> = memo(function Component5_Property1Create(props = {}) {
  const handleClick = () => {
    if (props.error) {
      // 創建遮罩層
      const overlay = document.createElement('div');
      overlay.className = classes.overlay;

      // 創建 alert 對話框
      const alertBox = document.createElement('div');
      alertBox.className = classes.alertBox;
      alertBox.innerHTML = `
        <div class="${classes.alertContent}">
          <div class="${classes.alertMessage}">${props.error}</div>
          <button class="${classes.alertButton}">確定</button>
        </div>
      `;

      // 添加到頁面
      overlay.appendChild(alertBox);
      document.body.appendChild(overlay);

      // 綁定確定按鈕事件
      const confirmButton = alertBox.querySelector(`.${classes.alertButton}`);
      if (confirmButton) {
        confirmButton.addEventListener('click', () => {
          overlay.remove();
        });
      }

      // 點擊遮罩層關閉對話框
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.remove();
        }
      });
    } else {
      props.onClick?.();
    }
  };

  return (
    <div
      className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}
      onClick={handleClick}
    >
      {props.text?.create != null ? props.text?.create : <div className={classes.create}>Confirm</div>}
    </div>
  );
});