'use client';
import React, { useState } from 'react';
import moment from 'moment';
import { RiCloseCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';

import Customer from './customer';
import OrderDetails from './oder-details';
import OrderItem from './order-item';
import modalStyles from '@/styles/modal.module.css';

const OrderNew = ({ onClose, onSave, order }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(order && order.orderDetails.customer ? order.orderDetails.customer : null);
  const [items, setItems] = useState(order && order.orderDetails.items ? order.orderDetails.items : []);
  const [orderDetails, setOrderDetails] = useState(order ? order : null);
  const [onEdit, setOnEdit] = useState(null);

  const onCancelhandler = () => {
    setSelectedCustomer(null);
    setItems([]);
    setOrderDetails(null);
    onClose();
  };

  const onSaveHandler = () => {
    if (selectedCustomer === null) return alert('Please select a customer.');
    if (items.length === 0) return alert('Order cart cannot be empty.');
    let total = items.reduce((total, data) => data.sub_total + total, 0);
    let status = { delivered: false, paid: false, isGcash: false };
    let details = {
      deliveryDate: orderDetails && orderDetails.deliveryDate ? orderDetails.deliveryDate : moment(),
      deliveryTime: orderDetails && orderDetails.deliveryTime ? orderDetails.deliveryTime : null,
      downPayment: orderDetails && orderDetails.downPayment ? orderDetails.downPayment : 0,
    };
    let displayName = `${selectedCustomer.name} - ${selectedCustomer.address} ${selectedCustomer.block} ${selectedCustomer.lot}`;
    let tempData = {
      ...details,
      ...status,
      id: order && order.id ? order.id : Date.now(),
      total: total - (orderDetails && orderDetails.downPayment ? orderDetails.downPayment : 0),
      orderDetails: { customer: { ...selectedCustomer, displayName }, items: items },
    };
    onSave(tempData);
    onCancelhandler();
  };

  return (
    <>
      <div className={modalStyles.modal_header_bar}>
        {order && order._id ? <h2>Order Details: {order.id}</h2> : <h2>Create New Order</h2>}
        {onEdit === null && (
          <div className={modalStyles.modal_header_icon_container}>
            <div className={modalStyles.modal_header_icon} title="save" onClick={onSaveHandler}>
              <RiCheckboxCircleLine />
            </div>
            <div className={modalStyles.modal_header_icon} title="cancel" onClick={onCancelhandler}>
              <RiCloseCircleLine />
            </div>
          </div>
        )}
      </div>
      {(onEdit === 'customer' || onEdit === null) && (
        <Customer selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} onEdit={setOnEdit} />
      )}
      {(onEdit === 'details' || onEdit === null) && (
        <OrderDetails orderDetails={orderDetails} setOrderDetails={setOrderDetails} onEdit={setOnEdit} />
      )}
      {(onEdit === 'items' || onEdit === null) && <OrderItem items={items} setItems={setItems} onEdit={setOnEdit} />}
    </>
  );
};

export default OrderNew;
