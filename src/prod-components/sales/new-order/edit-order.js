import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import NewOrderMainPage from './new-order-main-page';
import NewOrderIconBar from './new-order-icon-bar';
import NewOrderSideBar from './new-order-side-bar';

import apiRequest from '@/lib/axios';

const EditOrderPage = ({ setCurrentPage, orderData, isFutureOrder }) => {
  const queryClient = useQueryClient();
  const [selectedCustomer, setSelectedCustomer] = useState(orderData?.orderDetails?.customer);
  const [items, setItems] = useState(orderData?.orderDetails?.items);
  const [orderDetails, setOrderDetails] = useState(orderData);
  const [edit, setEdit] = useState(null);

  const editOrderMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `orders/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Order updated successfully.');
      isFutureOrder
        ? queryClient.invalidateQueries({ queryKey: ['future_orders'] })
        : queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (id) => apiRequest({ url: `orders/${id}`, method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Order deleted successfully.');
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
      setSelectedCustomer(orderData?.orderDetails?.customer);
      setItems(orderData?.orderDetails?.items);
      setOrderDetails(orderData);
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

  const onUpdateHandler = () => {
    if (!selectedCustomer) return toast.error('Please select a customer.');
    if (items.length === 0) return toast.error('Shopping cart should not be empty.');
    let total = items.reduce((total, data) => data.subTotal + total, 0) - +orderDetails.downPayment;
    let tempData = {
      ...orderDetails,
      total: total,
      paymentDate: orderDetails.isPaid ? orderDetails.paymentDate : null,
      orderDetails: { customer: selectedCustomer, items },
    };
    editOrderMutation.mutate({ id: orderData._id, data: tempData });
    isFutureOrder ? setCurrentPage('orders-list') : setCurrentPage('todays-list');
  };

  const onDeleteHandler = () => {
    if (confirm(`Are you sure you want to delete this order?`) == true) {
      deleteOrderMutation.mutate(orderData._id);
      isFutureOrder ? setCurrentPage('orders-list') : setCurrentPage('todays-list');
    }
  };

  return (
    <>
      <NewOrderSideBar
        selectedCustomer={selectedCustomer}
        orderDetails={orderDetails}
        step={3}
        setStep={() => null}
        items={items}
        setItems={setItems}
        onSave={onUpdateHandler}
        onCancel={() => (isFutureOrder ? setCurrentPage('orders-list') : setCurrentPage('todays-list'))}
        edit={edit}
        setEdit={setEdit}
        title={'Edit Order'}
      />
      <NewOrderMainPage
        setSelectedCustomer={setSelectedCustomer}
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
        step={3}
        setStep={() => null}
        onAddItem={addToCartHandler}
        edit={edit}
        setEdit={setEdit}
        items={items}
        setItems={setItems}
        isOrderEdit={true}
        onCancel={() => setEdit(null)}
      />
      <NewOrderIconBar
        setCurrentPage={setCurrentPage}
        reset={resetFormHandler}
        step={3}
        setStep={() => null}
        onCancel={() => (isFutureOrder ? setCurrentPage('orders-list') : setCurrentPage('todays-list'))}
        isEdit={true}
        onDelete={onDeleteHandler}
      />
    </>
  );
};

export default EditOrderPage;
