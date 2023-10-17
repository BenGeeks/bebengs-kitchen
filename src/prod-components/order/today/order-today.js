'use client';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { RiAddCircleLine } from 'react-icons/ri';

import apiRequest from '@/lib/axios';

import Modal from '@/assets/modal';
import OrderNew from './new/order-new';
import OrderEdit from './new/order-edit';
import OrderStatus from './order-status';
import OrderDetails from './order-details';
import { ORDER_COLUMNS } from '@/resources/orders';

import pageStyles from '@/styles/page.module.css';
import tableStyles from '@/styles/table.module.css';

const OrderToday = ({ orderQuery }) => {
  const queryClient = useQueryClient();
  const [newModal, setNewModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [viewData, setViewData] = useState({});

  const updateOrderMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `orders/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Order updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

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
  const onSaveHandler = (newData) => {
    newOrderMutation.mutate(newData);
    setNewModal(false);
  };

  const onUpdateHandler = (updatedData) => {
    updateOrderMutation.mutate(updatedData);
  };

  const statusUpdateHandler = (status) => {
    let orderData = orderQuery.data.filter((order) => order._id === status._id)[0];
    let updatedData = { ...orderData, isDelivered: status.isDelivered, isPaid: status.isPaid, isGcash: status.isGcash };
    updateOrderMutation.mutate({ id: status._id, data: updatedData });
  };

  const veiwOrderHandler = (data) => {
    setViewData(data);
    setViewModal(true);
  };

  if (orderQuery.isLoading) return <h1>Loading...</h1>;
  if (orderQuery.isError) return <pre> {JSON.stringify(orderQuery.error)}</pre>;

  return (
    <div className={pageStyles.page_container}>
      <div className={pageStyles.floating_icon} onClick={() => setNewModal(true)}>
        <RiAddCircleLine />
      </div>
      <Modal open={newModal}>
        <OrderNew onClose={() => setNewModal(false)} onSave={onSaveHandler} />
      </Modal>
      <Modal open={viewModal}>
        <OrderEdit onClose={() => setViewModal(false)} onSave={onUpdateHandler} order={viewData} />
      </Modal>
      <table className={tableStyles.table}>
        <thead>
          <tr className={tableStyles.table_head_row}>
            {ORDER_COLUMNS.map((head) => {
              return (
                <th className={tableStyles.table_head} key={head}>
                  <div className={tableStyles.table_head_text}>{head}</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {orderQuery.data.map((order, index) => {
            return (
              <tr key={index} className={tableStyles.table_row}>
                <td className={tableStyles.cell}>
                  <OrderStatus order={order} index={index} onUpdate={statusUpdateHandler} />
                </td>
                <td className={tableStyles.cell}>
                  <OrderDetails order={order} onView={veiwOrderHandler} />
                </td>
                <td className={tableStyles.cell_total}>{order.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderToday;
