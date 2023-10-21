import React, { useState } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { ImCancelCircle } from 'react-icons/im';
import { BiReset, BiUserPlus } from 'react-icons/bi';
import { IoFastFoodOutline } from 'react-icons/io5';

import iconStyles from '@/styles/icons.module.css';

const NewOrderIconBar = ({ reset, step, onCancel, addCustomer }) => {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <div className={showIcons ? iconStyles.order_bar_icon_container : iconStyles.order_bar_icon_container_hidden}>
      <div className={iconStyles.order_bar_hamburger_icon} title="Actions" onClick={() => setShowIcons(!showIcons)}>
        <div className={iconStyles.order_right_icon}>
          <RiMenuLine />
        </div>
        <p className={iconStyles.order_right_icon_text}>Actions</p>
      </div>

      <div className={iconStyles.order_right_icon_box} title="Cancel" onClick={() => onCancel()}>
        <div className={iconStyles.order_right_icon}>
          <ImCancelCircle />
        </div>
        <p className={iconStyles.order_right_icon_text}>Cancel</p>
      </div>
      <div className={iconStyles.order_right_icon_box} title="Reset" onClick={() => reset()}>
        <div className={iconStyles.order_right_icon}>
          <BiReset />
        </div>
        <p className={iconStyles.order_right_icon_text}>Reset</p>
      </div>
      {step === 1 && (
        <div className={iconStyles.order_right_icon_box} title="Add customer" onClick={addCustomer}>
          <div className={iconStyles.order_right_icon}>
            <BiUserPlus />
          </div>
          <p className={iconStyles.order_right_icon_text}>+ Customer</p>
        </div>
      )}
      {step === 3 && (
        <div className={iconStyles.order_right_icon_box} title="Add menu">
          <div className={iconStyles.order_right_icon}>
            <IoFastFoodOutline />
          </div>
          <p className={iconStyles.order_right_icon_text}>+ Menu</p>
        </div>
      )}
    </div>
  );
};

export default NewOrderIconBar;
