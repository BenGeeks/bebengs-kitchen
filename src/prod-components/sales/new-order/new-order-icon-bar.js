'use client';
import { BiReset, BiUserPlus } from 'react-icons/bi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { ImCancelCircle } from 'react-icons/im';

import iconStyles from '@/styles/icons-bar.module.css';

const NewOrderIconBar = ({ reset, step, onCancel, addCustomer }) => {
  return (
    <div className={iconStyles.icon_bar_container}>
      <div className={iconStyles.icon_box} title="Cancel" onClick={() => onCancel()}>
        <div className={iconStyles.icon}>
          <ImCancelCircle />
        </div>
        <p className={iconStyles.icon_text}>Cancel</p>
      </div>
      <div className={iconStyles.icon_box} title="Reset" onClick={() => reset()}>
        <div className={iconStyles.icon}>
          <BiReset />
        </div>
        <p className={iconStyles.icon_text}>Reset</p>
      </div>
      {step === 1 && (
        <div className={iconStyles.icon_box} title="Add customer" onClick={addCustomer}>
          <div className={iconStyles.icon}>
            <BiUserPlus />
          </div>
          <p className={iconStyles.icon_text}>+ Customer</p>
        </div>
      )}
      {step === 3 && (
        <div className={iconStyles.icon_box} title="Add menu">
          <div className={iconStyles.icon}>
            <IoFastFoodOutline />
          </div>
          <p className={iconStyles.icon_text}>+ Menu</p>
        </div>
      )}
    </div>
  );
};

export default NewOrderIconBar;
