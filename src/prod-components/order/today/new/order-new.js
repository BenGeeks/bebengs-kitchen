'use client';
import React, { useState } from 'react';
import moment from 'moment';
import { RiCloseCircleLine, RiCheckboxCircleLine, RiOrderPlayFill } from 'react-icons/ri';

import Customer from './customer';
import OrderDetails from './oder-details';
import OrderItem from './order-item';

import styles from '../order-today.module.css';

const OrderNew = ({ onClose, onSave }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [items, setItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  console.log('ORDER DETAILS: ', orderDetails);

  const onCancelhandler = () => {
    setSelectedCustomer(null);
    setItems([]);
    setOrderDetails(null);
    onClose();
  };

  const onSaveHandler = () => {
    let total = items.reduce((total, data) => data.sub_total + total, 0);
    let status = { delivered: false, paid: false, isGcash: false };
    let details = {
      deliveryDate: orderDetails && orderDetails.deliveryDate ? orderDetails.deliveryDate : moment().format('YYYY-MM-DD'),
      deliveryTime: orderDetails && orderDetails.deliveryTime ? orderDetails.deliveryTime : '08:00 AM',
      downPayment: orderDetails && orderDetails.downPayment ? orderDetails.downPayment : 0,
    };
    let displayName = `${selectedCustomer.name} - ${selectedCustomer.address} ${selectedCustomer.block} ${selectedCustomer.lot}`;
    let tempData = {
      ...details,
      ...status,
      id: Date.now(),
      total: total - (orderDetails && orderDetails.downPayment ? orderDetails.downPayment : 0),
      orderDetails: { customer: { ...selectedCustomer, displayName }, items: items },
    };
    onSave(tempData);
    onCancelhandler();
  };

  return (
    <>
      <div className={styles.modal_header_bar}>
        <h2>Create New Order</h2>
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
