'use client';
import React, { useState } from 'react';
import { RiCloseCircleLine, RiAddCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';

import SelectItem from './select-item';
import { ORDER_ITEMS_HEADER } from '@/resources/orders';
import Table from '@/assets/table';
import pageStyles from '@/styles/page.module.css';

const OrderItem = ({ items, setItems, onEdit, edited }) => {
  const [addEnabled, setAddEnabled] = useState(false);
  const [step, setStep] = useState(1);

  const addToCartHandler = (newItem) => {
    edited(true);
    setItems([...items, newItem]);
  };

  const onSave = () => {
    onEdit(null);
    setAddEnabled(false);
  };

  const handleDelete = (id) => {
    if (confirm('Confirm delete menu item?') == true) {
      let tempData = items.filter((order) => order.id !== id);
      setItems(tempData);
    }
  };

  return (
    <div className={pageStyles.sub_container}>
      <div className={pageStyles.sub_body}>
        <div className={pageStyles.sub_header_bar}>
          <h2>Item List: </h2>
          <h2>₱ {items.reduce((total, data) => data.subTotal + total, 0)}.00</h2>
          <div className={pageStyles.sub_header_icon_container}>
            {addEnabled ? (
              <>
                <div
                  className={pageStyles.sub_header_icon}
                  onClick={() => {
                    setAddEnabled(false);
                    onEdit(null);
                  }}
                  title="cancel"
                >
                  <RiCloseCircleLine />
                </div>
                <div className={pageStyles.sub_header_icon} title="save" onClick={onSave}>
                  <RiCheckboxCircleLine />
                </div>
              </>
            ) : (
              <div
                className={pageStyles.sub_header_icon}
                onClick={() => {
                  setAddEnabled(true);
                  onEdit('items');
                }}
                title="add"
              >
                <RiAddCircleLine />
              </div>
            )}
          </div>
        </div>
        <Table headers={ORDER_ITEMS_HEADER} data={items} enableDelete={addEnabled} enableEdit={addEnabled} onDelete={handleDelete} />
        {addEnabled && <SelectItem setItems={setItems} step={step} setStep={setStep} onSubmit={addToCartHandler} />}
      </div>
    </div>
  );
};

export default OrderItem;
