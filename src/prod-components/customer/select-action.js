import React from 'react';
import { RiDeleteBin4Line, RiEditLine } from 'react-icons/ri';
import { ImCancelCircle } from 'react-icons/im';

import customerStyles from '@/styles/customer.module.css';

const SelectCustomerAction = ({ onCancel, onEdit, onDelete }) => {
  return (
    <>
      <div className={customerStyles.header_bar}>
        <h2 className={customerStyles.header_bar_title}>Select an action</h2>
      </div>
      <div className={customerStyles.cards_container}>
        <div className={customerStyles.card_edit} onClick={onEdit}>
          <div className={customerStyles.card_icon}>
            <RiEditLine />
          </div>
          <div className={customerStyles.card_name}>EDIT</div>
        </div>
        <div className={customerStyles.card_delete} onClick={onDelete}>
          <div className={customerStyles.card_icon}>
            <RiDeleteBin4Line />
          </div>
          <div className={customerStyles.card_name}>DELETE</div>
        </div>
        <div className={customerStyles.card_cancel} onClick={onCancel}>
          <div className={customerStyles.card_icon}>
            <ImCancelCircle />
          </div>
          <div className={customerStyles.card_name}>CANCEL</div>
        </div>
      </div>
    </>
  );
};

export default SelectCustomerAction;
