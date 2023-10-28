import React, { useState } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { IoFastFoodOutline } from 'react-icons/io5';

import iconStyles from '@/styles/icons.module.css';

const MenuIconbar = ({ addNewMenu }) => {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <div className={showIcons ? iconStyles.order_bar_icon_container : iconStyles.order_bar_icon_container_hidden}>
      <div className={iconStyles.order_bar_hamburger_icon} title="Actions" onClick={() => setShowIcons(!showIcons)}>
        <div className={iconStyles.order_right_icon}>
          <RiMenuLine />
        </div>
        <p className={iconStyles.order_right_icon_text}>Actions</p>
      </div>

      <div className={iconStyles.order_right_icon_box} title="Add Menu" onClick={() => addNewMenu(true)}>
        <div className={iconStyles.order_right_icon}>
          <IoFastFoodOutline />
        </div>
        <p className={iconStyles.order_right_icon_text}>+ Menu</p>
      </div>
    </div>
  );
};

export default MenuIconbar;
