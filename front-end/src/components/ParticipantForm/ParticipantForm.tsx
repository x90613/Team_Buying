import { memo, useState } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { Component1_Property1Delete } from './Component1_Property1Delete/Component1_Property1Delete.js';
import { Component1_Property1NotCheck } from './Component1_Property1NotCheck/Component1_Property1NotCheck.js';
import { Component1_Property1Pencil } from './Component1_Property1Pencil/Component1_Property1Pencil.js';
import { Component1_Property1PlusCircle } from './Component1_Property1PlusCircle/Component1_Property1PlusCircle.js';
import { Component1_Property1PlusThick } from './Component1_Property1PlusThick/Component1_Property1PlusThick.js';
import { Component3_Property1Frame18 } from './Component3_Property1Frame18/Component3_Property1Frame18.js';
import { Component5_Property1Create } from './Component5_Property1Comfirm/Component5_Property1Create.js';
import classes from './ParticipantForm.module.css';
import { VectorIcon2 } from './VectorIcon2.js';
import { VectorIcon3 } from './VectorIcon3.js';
import { VectorIcon4 } from './VectorIcon4.js';
import { VectorIcon } from './VectorIcon.js';

interface Props {
  className?: string;
  hide?: {
    frame21?: boolean;
  };
  onConfirm?: () => void; // Add this
}

/* @figmaId 40000037:634 */
export const Order: FC<Props> = memo(function Order(props = {}) {
  const [inputGroups, setInputGroups] = useState([1]); // Just use numbers for keys
  const [isAnonymous, setIsAnonymous] = useState(false); // 添加匿名狀態

  const addInputGroup = () => {
    setInputGroups([...inputGroups, inputGroups.length + 1]);
  };

  // 添加刪除函數
  const deleteInputGroup = (indexToDelete: number) => {
    setInputGroups(inputGroups.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.headerContainer}>
        <div className={classes.headerTop}>
          <div className={classes.yourName}>Your Name</div>
        </div>
        <div className={classes.headerBottom}>
          {!isAnonymous && (
            <div className={classes.frame27}>
              <input type="text" className={classes.userNameInput} placeholder="Enter your name" />
              <Component1_Property1Pencil
                className={classes.component1}
                swap={{
                  vector: <VectorIcon className={classes.icon} />,
                }}
              />
            </div>
          )}
          <div className={classes.anonymousContainer}>
            <div className={classes.anonymous}>Anonymous</div>
            <Component1_Property1NotCheck 
              className={classes.anonymousCheck}
              onClick={() => setIsAnonymous(!isAnonymous)} // 切換匿名狀態
              isChecked={isAnonymous} // 傳遞檢查狀態
            />
          </div>
        </div>
      </div>

      <div className={classes.order}>Order</div>
      <div className={classes.quantity}>Quantity</div>
      <div className={classes.price}>Price</div>
      
      <div className={classes.orderContainer}>
        {inputGroups.map((key, index) => (
          <div key={key}>
            <div className={classes.inputRow}>
              <Component3_Property1Frame18
                className={classes.component3}
                hide={{
                  frame21: true,
                }}
              />
              <div className={classes.frame223}>
                <input type="text" className={classes.frame223Input} placeholder="Enter value" />
              </div>
              <div className={classes.frame24}>
                <input type="text" className={classes.frame24Input} placeholder="Enter value" />
              </div>
              <Component1_Property1Delete
                className={classes.component8}
                swap={{
                  vector: <VectorIcon4 className={classes.icon4} />,
                }}
                onClick={() => deleteInputGroup(index)} // 添加 onClick 處理器
              />
            </div>
            <div className={classes.inputRow}>
              <div className={classes.frame223}>
                <input type="text" className={classes.frame223Input} placeholder="Enter description" />
              </div>
            </div>
          </div>
        ))}
        
      </div>
      
      <Component1_Property1PlusCircle
        className={classes.component7}
        swap={{
          vector: <VectorIcon3 className={classes.icon3} />,
        }}
        onClick={addInputGroup} // Ensure onClick is passed here
      />
      <Component5_Property1Create
        className={classes.component9}
        onClick={props.onConfirm} // Add this
      />
      
    </div>
  );
});
