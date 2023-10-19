'use client';
import React, { useState } from 'react';
import { RiCloseCircleLine, RiAddCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';

import SelectItem from './select-item';
import { ORDER_ITEMS_HEADER } from '@/resources/orders';
import Table from '@/assets/table';
import pageStyles from '@/styles/page.module.css';

const OrderItem = ({ items, setItems, onEdit, edited, isNew, setCompleted }) => {
  const [addEnabled, setAddEnabled] = useState(isNew ? true : false);
  const [step, setStep] = useState(1);
  const [editData, setEditData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const addToCartHandler = (newItem) => {
    let tempList = [];
    let updated = false;
    items.forEach((item) => {
      if (item._id === newItem._id) {
        tempList.push({ ...item, qty: item.qty + newItem.qty, subTotal: (item.qty + newItem.qty) * item.price });
        updated = true;
      } else {
        tempList.push(item);
      }
    });
    !updated && tempList.push(newItem);
    setItems(tempList);
    !isNew && edited(true);
  };

  const updateHandler = (updatedItem) => {
    let tempData = items.map((item) => (item._id === updatedItem._id ? updatedItem : item));
    setItems(tempData);
  };

  const onSave = () => {
    onEdit(null);
    isNew && setCompleted(true);
    setAddEnabled(false);
  };

  const handleDelete = (id) => {
    if (confirm('Confirm delete menu item?') == true) {
      let tempData = items.filter((order) => order._id !== id);
      setItems(tempData);
    }
  };

  const editHandler = (data) => {
    setEditData(data);
    setIsEdit(true);
    setStep(3);
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
                {!isNew && (
                  <div
                    className={pageStyles.sub_header_icon}
                    onClick={() => {
                      setAddEnabled(false);
                      !isNew && onEdit(null);
                    }}
                    title="cancel"
                  >
                    <RiCloseCircleLine />
                  </div>
                )}
                {items.length !== 0 && (
                  <div className={pageStyles.sub_header_icon} title="save" onClick={onSave}>
                    <RiCheckboxCircleLine />
                  </div>
                )}
              </>
            ) : (
              <div
                className={pageStyles.sub_header_icon}
                onClick={() => {
                  setAddEnabled(true);
                  isNew ? onEdit(true) : onEdit('items');
                }}
                title="add"
              >
                <RiAddCircleLine />
              </div>
            )}
          </div>
        </div>
        <Table
          headers={ORDER_ITEMS_HEADER}
          data={items}
          enableDelete={addEnabled}
          enableEdit={addEnabled}
          onDelete={handleDelete}
          onEdit={editHandler}
        />
        {addEnabled && (
          <SelectItem
            setItems={setItems}
            step={step}
            setStep={setStep}
            onSubmit={addToCartHandler}
            onUpdate={updateHandler}
            isEdit={isEdit}
            editData={editData}
          />
        )}
      </div>
    </div>
  );
};

export default OrderItem;
