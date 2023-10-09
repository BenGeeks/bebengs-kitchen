'use client';
import React, { useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';

import Modal from '@/assets/modal';
import OrderNew from './new/order-new';
import OrderStatus from './order-status';
import OrderDetails from './order-details';
import { ORDER_COLUMNS, SAMPLE_ORDER_DATA } from './resources';
import styles from './order-today.module.css';
import styles2 from '@/assets/react-table.module.css';

const OrderToday = () => {
  const [newModal, setNewModal] = useState(false);
  const [data, setData] = useState(SAMPLE_ORDER_DATA);
  const [viewModal, setViewModal] = useState(false);
  const [viewData, setViewData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const loading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  const onSaveHandler = (newData) => {
    let tempData = [...data, newData];
    setData(tempData);
    setIsLoading(true);
    loading();
  };

  const onUpdateHandler = (updatedData) => {
    console.log('UPDATED DATA: ', updatedData);
    let updatedOrder = [];
    data.forEach((order) => {
      order.id === updatedData.id ? updatedOrder.push(updatedData) : updatedOrder.push(order);
    });
    console.log('UPDATED ORDER LIST', updatedOrder);
    setData(updatedOrder);
    loading();
  };

  const statusUpdateHandler = (status) => {
    let updatedOrder = [];
    data.forEach((order) => {
      order.id === status.id ? updatedOrder.push({ ...order, ...status }) : updatedOrder.push(order);
    });
    setData(updatedOrder);
    loading();
  };

  const veiwOrderHandler = (data) => {
    setViewData(data);
    setViewModal(true);
  };
  return (
    <>
      <div className={styles.floating_icon} onClick={() => setNewModal(true)}>
        <RiAddCircleLine />
      </div>
      <Modal open={newModal}>
        <OrderNew onClose={() => setNewModal(false)} onSave={onSaveHandler} />
      </Modal>
      <Modal open={viewModal}>
        <OrderNew onClose={() => setViewModal(false)} onSave={onUpdateHandler} order={viewData} />
      </Modal>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <table className={styles2.table}>
          <thead>
            <tr className={styles2.table_head_row}>
              {ORDER_COLUMNS.map((head) => {
                return (
                  <th className={styles2.table_head} key={head}>
                    <div className={styles2.table_head_text}>{head}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((order, index) => {
                return (
                  <tr key={index} className={styles.table_row}>
                    <td className={styles2.cell}>
                      <OrderStatus order={order} index={index} onUpdate={statusUpdateHandler} />
                    </td>
                    <td className={styles2.cell}>
                      <OrderDetails order={order} onView={veiwOrderHandler} />
                    </td>
                    <td className={styles2.cell_total}>{order.total}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderToday;
