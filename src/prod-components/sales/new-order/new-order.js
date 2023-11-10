'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import CustomerNew from '@/prod-components/customer/customer-new';
import NewOrderMainPage from './new-order-main-page';
import { DEFAULT_ORDER_DETAILS } from './resources';
import NewOrderIconBar from './new-order-icon-bar';
import NewOrderSideBar from './new-order-side-bar';
import apiRequest from '@/lib/axios';

const NewOrderPage = ({ setCurrentPage, isFutureOrder }) => {
  const queryClient = useQueryClient();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [items, setItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState(DEFAULT_ORDER_DETAILS);
  const [step, setStep] = useState(1);
  const [edit, setEdit] = useState(1);
  const [addCustomer, setAddCustomer] = useState(false);

  const newOrderMutation = useMutation({
    mutationFn: (data) => apiRequest({ url: `orders`, method: 'POST', data: data }),
    onSuccess: () => {
      toast.success('Order added successfully.');
      isFutureOrder
        ? queryClient.invalidateQueries({ queryKey: ['future_orders'] })
        : queryClient.invalidateQueries({ queryKey: ['orders'] });
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
      setEdit(1);
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
      isFutureOrder ? setCurrentPage('orders-list') : setCurrentPage('todays-list');
    }
  };

  const onSaveHandler = () => {
    if (!selectedCustomer) return toast.error('Please select a customer.');
    if (items.length === 0) return toast.error('Shopping cart should not be empty.');
    let total = items.reduce((total, data) => data.subTotal + total, 0) - +orderDetails.downPayment;
    let tempData = {
      ...orderDetails,
      total: total,
      paymentDate: orderDetails.isPaid ? paymentDate : null,
      orderDetails: { customer: selectedCustomer, items },
    };
    newOrderMutation.mutate(tempData);
    setSelectedCustomer(null);
    setItems([]);
    setOrderDetails(DEFAULT_ORDER_DETAILS);
    setStep(1);
    isFutureOrder ? setCurrentPage('orders-list') : setCurrentPage('todays-list');
  };

  const onAddCustomerSuccess = (customer) => {
    setSelectedCustomer(customer);
    setStep(2);
    setEdit(2);
  };

  return (
    <>
      <CustomerNew open={addCustomer} close={() => setAddCustomer(false)} onAddCustomerSuccess={onAddCustomerSuccess} />
      <NewOrderSideBar
        selectedCustomer={selectedCustomer}
        orderDetails={orderDetails}
        setStep={setStep}
        step={step}
        items={items}
        onSave={onSaveHandler}
        onCancel={onCancelHandler}
        edit={edit}
        setEdit={setEdit}
        title={'Add New Order'}
      />
      <NewOrderMainPage
        setSelectedCustomer={setSelectedCustomer}
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
        step={step}
        setStep={setStep}
        onAddItem={addToCartHandler}
        edit={edit}
        setEdit={setEdit}
        items={items}
        setItems={setItems}
        isOrderEdit={false}
        onCancel={() => setEdit(null)}
      />
      <NewOrderIconBar reset={resetFormHandler} step={step} onCancel={onCancelHandler} addCustomer={() => setAddCustomer(true)} />
    </>
  );
};

export default NewOrderPage;
