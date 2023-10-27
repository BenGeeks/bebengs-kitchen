import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ModalWide from '@/assets/modal-wide';
import CustomerNew from '@/prod-components/customer/customer-new';
import NewOrderIconBar from './new-order-icon-bar';
import NewOrderMainPage from './new-order-main-page';
import NewOrderSideBar from './new-order-side-bar';
import apiRequest from '@/lib/axios';
import { DEFAULT_ORDER_DETAILS } from '@/resources/orders';

const EditOrderPage = ({ setCurrentPage, orderData }) => {
  const queryClient = useQueryClient();
  const [selectedCustomer, setSelectedCustomer] = useState(orderData?.orderDetails?.customer);
  const [items, setItems] = useState(orderData?.orderDetails?.items);
  const [orderDetails, setOrderDetails] = useState(orderData);
  const [step, setStep] = useState(3);
  const [edit, setEdit] = useState(4);
  const [addCustomer, setAddCustomer] = useState(false);

  const editOrderMutation = useMutation({
    mutationFn: (data) => apiRequest({ url: `orders/${data._id}`, method: 'PUT', data: data }),
    onSuccess: () => {
      toast.success('Order updated successfully.');
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
      orderDetails: { customer: selectedCustomer, items },
    };
    editOrderMutation.mutate(tempData);
    setSelectedCustomer(null);
    setItems([]);
    setOrderDetails(DEFAULT_ORDER_DETAILS);
    setStep(1);
    setCurrentPage('order-list');
  };

  const onAddCustomerSuccess = (customer) => {
    setSelectedCustomer(customer);
    setStep(2);
    setEdit(2);
  };

  return (
    <>
      <ModalWide open={addCustomer} close={() => setAddCustomer(false)}>
        <CustomerNew close={() => setAddCustomer(false)} onAddCustomerSuccess={onAddCustomerSuccess} />
      </ModalWide>
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
        title={`Edit Order: ${orderData._id} `}
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
      />
      <NewOrderIconBar
        setCurrentPage={setCurrentPage}
        reset={resetFormHandler}
        step={step}
        onCancel={onCancelHandler}
        addCustomer={() => setAddCustomer(true)}
      />
    </>
  );
};

export default EditOrderPage;
