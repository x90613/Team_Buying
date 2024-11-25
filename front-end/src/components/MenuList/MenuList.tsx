import { memo, useState } from 'react';
import type { FC } from 'react';
import * as ReactDOM from 'react-dom/client';  // Add this import
import { useNavigate } from 'react-router-dom';  // Add this
import { Menu1 } from '../Menu/Menu';
import { Order } from '../ParticipantForm/ParticipantForm';
import { Unnamed as Status } from '../Status/Status';  // Add this import
import HostForm from '../HostForm_new/HostForm';  // Add this import

import resets from '../_resets.module.css';
import { Component1_Property1Account } from './MenuList_Property1Account/MenuList_Property1Account.js';
import { Component1_Property1Menu } from './MenuList_Property1Menu/MenuList_Property1Menu.js';
import { Component5_Property1Create } from './MenuList_Property1Create/MenuList_Property1Create.js';
import classes from './MenuList.module.css';
import { VectorIcon2 } from './VectorIcon2.js';
import { VectorIcon } from './VectorIcon.js';

interface Props {
  className?: string;
}
/* @figmaId 29:516 */
export const MenuList: FC<Props> = memo(function MenuList(props = {}) {
  const navigate = useNavigate();  // Add this
  const [showComponents, setShowComponents] = useState(false);
  const [showMenu1Modal, setShowMenu1Modal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showHostFormModal, setShowHostFormModal] = useState(false);  // Add this

  const handleMenuClick = () => {
    setShowComponents(!showComponents);
  };

  const handleMenu1Click = () => {
    setShowMenu1Modal(true);
  };

  const handleOrderClick = () => {
    setShowOrderModal(true);
  };

  const handleOrderConfirm = () => {
    setShowOrderModal(false);
    setTimeout(() => {
      navigate('/order-item/status');
    }, 0);
    // navigate('/order-item/status'); // 直接導航到狀態頁面

  };

  return (
    <>
      <div className={`${resets.clapyResets} ${classes.root}`}>
        <div className={classes.frame34}>
          <div className={classes.unnamed}>
            <Component1_Property1Account
              className={classes.component2}
              swap={{
                vector: <VectorIcon className={classes.icon} />,
              }}
            />
          </div>
        </div>
        {showComponents && (
          <>
            <Component5_Property1Create
              className={classes.component6}
              text={{
                create: <div className={classes.create}>Menu</div>,
              }}
              onClick={handleMenu1Click}
            />
            <Component5_Property1Create
              className={classes.component5}
              text={{
                create: <div className={classes.create2}>Order</div>,
              }}
              onClick={handleOrderClick}  // Add this
            />
            <Component5_Property1Create
              className={classes.component7}
              text={{
                create: <div className={classes.create3}>Host backend system</div>,
              }}
              onClick={() => setShowHostFormModal(true)}  // Add this
            />
          </>
        )}
        <div className={classes.unnamed2} onClick={handleMenuClick}>
          <Component1_Property1Menu
            className={classes.component8}
            swap={{
              vector: <VectorIcon2 className={classes.icon2} />,
            }}
          />
        </div>
      </div>
      {showMenu1Modal && (
        <div className={classes.modalOverlay} onClick={() => setShowMenu1Modal(false)}>
          <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
            <Menu1 />
          </div>
        </div>
      )}
      {showOrderModal && (
        <div className={classes.modalOverlay} onClick={() => setShowOrderModal(false)}>
          <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
            <Order onConfirm={handleOrderConfirm} />
          </div>
        </div>
      )}
      {showHostFormModal && (
        <HostForm
          isOpen={showHostFormModal}
          onClose={() => setShowHostFormModal(false)}
        />
      )}
    </>
  );
});
