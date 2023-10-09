'use client';
import React, { useState } from 'react';
import moment from 'moment';
import { RiCloseCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';

import Customer from './customer';
import OrderDetails from './oder-details';
import OrderItem from './order-item';

import styles from '../order-today.module.css';

const OrderNew = ({ onClose, onSave, order }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(order && order.orderDetails.customer ? order.orderDetails.customer : null);
  const [items, setItems] = useState(order && order.orderDetails.items ? order.orderDetails.items : []);
  const [orderDetails, setOrderDetails] = useState(order ? order : null);

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
      deliveryDate: orderDetails && orderDetails.deliveryDate ? orderDetails.deliveryDate : moment().format('YYYY-MM-DD'),
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
      <div className={styles.modal_header_bar}>
        {order && order.id ? <h2>Order Details: {order.id}</h2> : <h2>Create New Order</h2>}
        <div className={styles.modal_header_icon_container}>
          <div className={styles.modal_header_icon} onClick={onSaveHandler}>
            <RiCheckboxCircleLine />
          </div>
          <div className={styles.modal_header_icon} onClick={onCancelhandler}>
            <RiCloseCircleLine />
          </div>
        </div>
      </div>
      <Customer selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} />
      <OrderDetails orderDetails={orderDetails} setOrderDetails={setOrderDetails} />
      <OrderItem items={items} setItems={setItems} />
    </>
  );
};

export default OrderNew;
