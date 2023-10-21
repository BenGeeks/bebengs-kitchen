import React, { useState } from 'react';
import { RiMenuLine, RiMapPin2Line, RiMapPinAddLine } from 'react-icons/ri';
import { BiUserPlus, BiUser } from 'react-icons/bi';

import iconStyles from '@/styles/icons.module.css';

const CustomerIconBar = ({ onAdd, onAddAddress, currentPage, setCurrentPage }) => {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <div className={showIcons ? iconStyles.order_bar_icon_container : iconStyles.order_bar_icon_container_hidden}>
      <div className={iconStyles.order_bar_hamburger_icon} title="Actions" onClick={() => setShowIcons(!showIcons)}>
        <div className={iconStyles.order_right_icon}>
          <RiMenuLine />
        </div>
        <p className={iconStyles.order_right_icon_text}>Actions</p>
      </div>
      <div
        className={currentPage === 'customer' ? iconStyles.order_right_icon_box_active : iconStyles.order_right_icon_box}
        title="Customers"
        onClick={() => setCurrentPage('customer')}
      >
        <div className={iconStyles.order_right_icon}>
          <BiUser />
        </div>
        <p className={iconStyles.order_right_icon_text}>Customers</p>
      </div>
      <div
        className={currentPage === 'address' ? iconStyles.order_right_icon_box_active : iconStyles.order_right_icon_box}
        title="Address"
        onClick={() => setCurrentPage('address')}
      >
        <div className={iconStyles.order_right_icon}>
          <RiMapPin2Line />
        </div>
        <p className={iconStyles.order_right_icon_text}>Address</p>
      </div>

      {currentPage === 'customer' && (
        <div className={iconStyles.order_right_icon_box} title="Add customer" onClick={onAdd}>
          <div className={iconStyles.order_right_icon}>
            <BiUserPlus />
          </div>
          <p className={iconStyles.order_right_icon_text}>+ Customer</p>
        </div>
      )}
      {currentPage === 'address' && (
        <div className={iconStyles.order_right_icon_box} title="Add address" onClick={onAddAddress}>
          <div className={iconStyles.order_right_icon}>
            <RiMapPinAddLine />
          </div>
          <p className={iconStyles.order_right_icon_text}>+ Address</p>
        </div>
      )}
    </div>
  );
};

export default CustomerIconBar;
