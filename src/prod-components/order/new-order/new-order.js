import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import NewOrderIconBar from './new-order-icon-bar';
import NewOrderMainPage from './new-order-main-page';
import NewOrderSideBar from './new-order-side-bar';
import apiRequest from '@/lib/axios';
import { DEFAULT_ORDER_DETAILS } from '@/resources/orders';

const NewOrderPage = ({ setCurrentPage }) => {
  const queryClient = useQueryClient();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [items, setItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(DEFAULT_ORDER_DETAILS);
  const [step, setStep] = useState(1);

  const newOrderMutation = useMutation({
    mutationFn: (data) => apiRequest({ url: `orders`, method: 'POST', data: data }),
    onSuccess: () => {
      toast.success('Order added successfully.');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const resetFormHandler = () => {
    if (confirm('Are you sure to reset the data') == true) {
      setSelectedCustomer(null);
      setItems([]);
      setOrderDetails(DEFAULT_ORDER_DETAILS);
      setStep(1);
    }
  };

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
  };

  const onCancelHandler = () => {
    if (confirm('Are you sure you want to cancel this order?') == true) {
      setSelectedCustomer(null);
      setItems([]);
      setOrderDetails(DEFAULT_ORDER_DETAILS);
      setStep(1);
      setCurrentPage('order-list');
    }
  };

  const onSaveHandler = () => {
    if (!selectedCustomer) return toast.error('Please select a customer.');
    if (items.length === 0) return toast.error('Shopping cart should not be empty.');
    let total = items.reduce((total, data) => data.subTotal + total, 0) - +orderDetails.downPayment;
    let tempData = {
      ...orderDetails,
      isGcash: false,
      isDelivered: false,
      isPaid: false,
      total: total,
      orderDetails: { customer: { _id: selectedCustomer._id, displayName: selectedCustomer.displayName }, items },
    };
    newOrderMutation.mutate(tempData);
    setSelectedCustomer(null);
    setItems([]);
    setOrderDetails(DEFAULT_ORDER_DETAILS);
    setStep(1);
    setCurrentPage('order-list');
  };

  return (
    <>
      <NewOrderSideBar
        selectedCustomer={selectedCustomer}
        orderDetails={orderDetails}
        setStep={setStep}
        step={step}
        items={items}
        onSave={onSaveHandler}
        onCancel={onCancelHandler}
      />
      <NewOrderMainPage
        setSelectedCustomer={setSelectedCustomer}
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
        step={step}
        setStep={setStep}
        onAddItem={addToCartHandler}
      />
      <NewOrderIconBar setCurrentPage={setCurrentPage} reset={resetFormHandler} step={step} />
    </>
  );
};

export default NewOrderPage;
