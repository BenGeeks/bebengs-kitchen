'use client';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { RiAddCircleLine } from 'react-icons/ri';

import apiRequest from '@/lib/axios';

import Modal from '@/assets/modal';
import OrderNew from './new/order-new';
import OrderStatus from './order-status';
import OrderDetails from './order-details';
import { ORDER_COLUMNS } from '@/resources/orders';

import pageStyles from '@/styles/page.module.css';
import tableStyles from '@/styles/table.module.css';

const OrderToday = () => {
  const queryClient = useQueryClient();
  const [newModal, setNewModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [viewData, setViewData] = useState({});

  const orderQuery = useQuery({
    queryKey: ['orders'],
    queryFn: () => apiRequest({ url: 'orders', method: 'GET' }).then((res) => res.data),
  });

  const updateOrderMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `orders/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Order updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const onSaveHandler = (newData) => {
    let tempData = [...data, newData];
    setData(tempData);
  };

  const onUpdateHandler = (updatedData) => {
    console.log('UPDATED DATA: ', updatedData);
    let updatedOrder = [];
    orderQuery.data.data.forEach((order) => {
      order._id === updatedData._id ? updatedOrder.push(updatedData) : updatedOrder.push(order);
    });
    console.log('UPDATED ORDER LIST', updatedOrder);
    setData(updatedOrder);
  };

  const statusUpdateHandler = (status) => {
    console.log('STATUS: ', status);
    let orderData = orderQuery.data.data.filter((order) => order._id === status._id)[0];
    let updatedData = { ...orderData, isDelivered: status.isDelivered, isPaid: status.isPaid, isGcash: status.isGcash };
    updateOrderMutation.mutate({ id: status._id, data: updatedData });
    console.log('UPDATED ORDER: ', updatedData);
    // let updatedOrder = [];
    // orderQuery.data.data.forEach((order) => {
    //   order._id === status._id ? updatedOrder.push({ ...order, ...status }) : updatedOrder.push(order);
    // });
  };

  const veiwOrderHandler = (data) => {
    setViewData(data);
    setViewModal(true);
  };

  if (orderQuery.isLoading) return <h1>Loading...</h1>;
  if (orderQuery.isError) return <pre> {JSON.stringify(orderQuery.error)}</pre>;
  console.log('DATABASE: ', orderQuery.data.data);
  return (
    <div className={pageStyles.page_container}>
      <div className={pageStyles.floating_icon} onClick={() => setNewModal(true)}>
        <RiAddCircleLine />
      </div>
      {/* <Modal open={newModal}>
        <OrderNew onClose={() => setNewModal(false)} onSave={onSaveHandler} />
      </Modal>
      <Modal open={viewModal}>
        <OrderNew onClose={() => setViewModal(false)} onSave={onUpdateHandler} order={viewData} />
      </Modal> */}
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
          {orderQuery.data.data.map((order, index) => {
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
