import { IoFastFoodOutline } from 'react-icons/io5';

import iconStyles from '@/styles/icons-bar.module.css';

const MenuIconbar = ({ addNewMenu }) => {
  return (
    <div className={iconStyles.icon_bar_container}>
      <div className={iconStyles.icon_box} title="Add Menu" onClick={() => addNewMenu(true)}>
        <div className={iconStyles.icon}>
          <IoFastFoodOutline />
        </div>
        <p className={iconStyles.icon_text}>+ Menu</p>
      </div>
    </div>
  );
};

export default MenuIconbar;
