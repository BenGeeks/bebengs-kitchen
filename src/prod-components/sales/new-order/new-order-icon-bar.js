'use client';
import { useState } from 'react';
import { BiReset, BiUserPlus } from 'react-icons/bi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { ImCancelCircle } from 'react-icons/im';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdOutlinePercent } from 'react-icons/md';

import NumberPad from '@/assets/number-pad';
import iconStyles from '@/styles/icons-bar.module.css';

const NewOrderIconBar = ({ reset, step, onCancel, addCustomer, setDeliveryCharge, setDiscount, deliveryCharge, discount }) => {
  const [openNumberPad, setOpenNumPad] = useState(false);
  const [action, setAction] = useState(null);

  const addDeliveryChargeHandler = () => {
    setAction('deliveryCharge');
    setOpenNumPad(true);
  };

  const addDiscountHandler = () => {
    setAction('discount');
    setOpenNumPad(true);
  };

  const onSubmitHandler = (number) => {
    action === 'deliveryCharge' && setDeliveryCharge(number);
    action === 'discount' && setDiscount(number);
  };
  return (
    <>
      {openNumberPad && (
        <NumberPad
          open={openNumberPad}
          close={() => setOpenNumPad(false)}
          onSubmit={onSubmitHandler}
          value={action === 'deliveryCharge' ? deliveryCharge : discount}
        />
      )}
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
        {/* {step === 3 && (
          <div className={iconStyles.icon_box} title="Add menu">
            <div className={iconStyles.icon}>
              <IoFastFoodOutline />
            </div>
            <p className={iconStyles.icon_text}>+ Menu</p>
          </div>
        )} */}
        <div className={iconStyles.icon_box} title="delivery" onClick={addDeliveryChargeHandler}>
          <div className={iconStyles.icon}>
            <TbTruckDelivery />
          </div>
          <p className={iconStyles.icon_text}>Delivery</p>
        </div>
        <div className={iconStyles.icon_box} title="discount" onClick={addDiscountHandler}>
          <div className={iconStyles.icon}>
            <MdOutlinePercent />
          </div>
          <p className={iconStyles.icon_text}>Discount</p>
        </div>
      </div>
    </>
  );
};

export default NewOrderIconBar;
