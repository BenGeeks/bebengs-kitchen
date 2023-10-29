import React from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { LiaMoneyBillWaveAltSolid } from 'react-icons/lia';

import iconStyles from '@/styles/icons.module.css';

const CollectibleIconBar = ({ showIcons, onPaid, selectedOrder }) => {
  return (
    <div className={showIcons ? iconStyles.order_bar_icon_container : iconStyles.order_bar_icon_container_hidden}>
      <div className={iconStyles.order_bar_hamburger_icon} title="Actions" onClick={() => setShowIcons(!showIcons)}>
        <div className={iconStyles.order_right_icon}>
          <RiMenuLine />
        </div>
        <p className={iconStyles.order_right_icon_text}>Actions</p>
      </div>
      {selectedOrder && (
        <div className={iconStyles.order_right_icon_box} title="Paid" onClick={onPaid}>
          <div className={iconStyles.order_right_icon}>
            <LiaMoneyBillWaveAltSolid />
          </div>
          <p className={iconStyles.order_right_icon_text}>Paid</p>
        </div>
      )}
    </div>
  );
};

export default CollectibleIconBar;
