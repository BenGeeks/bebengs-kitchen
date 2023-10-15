'use client';
import React, { useState } from 'react';
import { RiCloseCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';

import Customer from './customer';
import OrderDetails from './oder-details';
import OrderItem from './order-item';
import modalStyles from '@/styles/modal.module.css';

const OrderEdit = ({ onClose, onSave, order }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(order?.orderDetails?.customer);
  const [items, setItems] = useState(order?.orderDetails?.items);
  const [orderDetails, setOrderDetails] = useState({
    deliveryDate: order.deliveryDate,
    deliveryTime: order.deliveryTime,
    downPayment: order.downPayment,
  });
  const [onEdit, setOnEdit] = useState(null);
  const [edited, setEdited] = useState(false);

  const onCancelhandler = () => {
    setSelectedCustomer(null);
    setItems([]);
    setOrderDetails(null);
    setEdited(false);
    setOnEdit(null);
    onClose();
  };

  const onSaveHandler = () => {
    let total = items.reduce((total, data) => data.subTotal + total, 0) - +orderDetails.downPayment;
    let tempData = {
      id: order._id,
      data: { ...order, ...orderDetails, total, orderDetails: { customer: selectedCustomer, items } },
    };
    onSave(tempData);
    onCancelhandler();
  };

  return (
    <>
      <div className={modalStyles.modal_header_bar}>
        <h2>Order Details: </h2>
        {onEdit === null && <h2>₱ {items.reduce((total, data) => data.subTotal + total, 0) - +orderDetails.downPayment}.00 </h2>}
        {onEdit === null && (
          <div className={modalStyles.modal_header_icon_container}>
            {edited && (
              <div className={modalStyles.modal_header_icon} title="save" onClick={onSaveHandler}>
                <RiCheckboxCircleLine />
              </div>
            )}

            <div className={modalStyles.modal_header_icon} title="cancel" onClick={onCancelhandler}>
              <RiCloseCircleLine />
            </div>
          </div>
        )}
      </div>
      {(onEdit === 'customer' || onEdit === null) && (
        <Customer selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} onEdit={setOnEdit} edited={setEdited} />
      )}
      {(onEdit === 'details' || onEdit === null) && (
        <OrderDetails orderDetails={orderDetails} setOrderDetails={setOrderDetails} onEdit={setOnEdit} edited={setEdited} />
      )}
      {(onEdit === 'items' || onEdit === null) && <OrderItem items={items} setItems={setItems} onEdit={setOnEdit} edited={setEdited} />}
    </>
  );
};

export default OrderEdit;
