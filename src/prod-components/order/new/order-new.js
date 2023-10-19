'use client';
import React, { useState } from 'react';
import { RiCloseCircleLine, RiCheckboxCircleLine } from 'react-icons/ri';

import Customer from './customer';
import OrderDetails from './oder-details';
import { DEFAULT_ORDER_DETAILS } from '@/resources/orders';
import OrderItem from './order-item';
import modalStyles from '@/styles/modal.module.css';

const OrderNew = ({ onClose, onSave }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [items, setItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(DEFAULT_ORDER_DETAILS);
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [onEdit, setOnEdit] = useState(null);

  const onCancelhandler = () => {
    setSelectedCustomer(null);
    setItems([]);
    setOrderDetails(DEFAULT_ORDER_DETAILS);
    onClose();
  };

  const onSaveHandler = () => {
    let total = items.reduce((total, data) => data.subTotal + total, 0) - +orderDetails.downPayment;
    let tempData = {
      ...orderDetails,
      isGcash: false,
      isDelivered: false,
      isPaid: false,
      total: total,
      orderDetails: { customer: { _id: selectedCustomer._id, displayName: selectedCustomer.displayName }, items },
    };
    onSave(tempData);
    onCancelhandler();
  };

  return (
    <>
      <div className={modalStyles.modal_header_bar}>
        <h2>Create New Order: Step {step}</h2>
        <div className={modalStyles.modal_header_icon_container}>
          {selectedCustomer && items.length !== 0 && completed && !onEdit && (
            <div className={modalStyles.modal_header_icon} title="save" onClick={onSaveHandler}>
              <RiCheckboxCircleLine />
            </div>
          )}

          <div className={modalStyles.modal_header_icon} title="cancel" onClick={onCancelhandler}>
            <RiCloseCircleLine />
          </div>
        </div>
      </div>
      {step === 1 && (
        <Customer selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} setStep={setStep} isNew={true} />
      )}
      {step === 2 && (
        <>
          <Customer selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} setStep={setStep} isNew={false} />
          <OrderDetails orderDetails={orderDetails} setOrderDetails={setOrderDetails} setStep={setStep} isNew={true} />
        </>
      )}
      {step === 3 && (
        <>
          <Customer selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} setStep={setStep} isNew={false} />
          <OrderDetails orderDetails={orderDetails} setOrderDetails={setOrderDetails} setStep={setStep} isNew={false} />
          <OrderItem items={items} setItems={setItems} isNew={true} setCompleted={setCompleted} onEdit={setOnEdit} />
        </>
      )}
    </>
  );
};

export default OrderNew;
