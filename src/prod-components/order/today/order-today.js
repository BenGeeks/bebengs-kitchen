'use client';
import React, { useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';

import SalesTable from '@/assets/sales-table';

import Modal from '@/assets/modal';
import OrderNew from './new/order-new';
import OrderStatus from './order-status';
import OrderDetails from './order-details';
import { COLUMNS, ORDER_COLUMNS, SAMPLE_ORDER_DATA } from './resources';
import styles from './order-today.module.css';
import styles2 from '@/assets/react-table.module.css';

const OrderToday = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(SAMPLE_ORDER_DATA);
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);

  const onAddOrder = () => {
    setModalOpen(true);
  };

  const onSaveHandler = (newData) => {
    let tempData = [...data, newData];
    setData(tempData);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('SET TIMEOUT HAS BEEN CALLED');
    }, 500);
  };

  const selectCustomerHandler = (orderDetails) => {
    console.log('SELECT CUSTOMER HANDLER: ', orderDetails);
  };

  const statusUpdateHandler = (data) => {
    console.log('STATUS UPDATE HANDLER: ', data);
  };

  const veiwOrderHandler = (data) => {
    console.log('VIEW ORDER HANDLER: ', data);
  };
  return (
    <>
      <div className={styles.floating_icon} onClick={onAddOrder}>
        <RiAddCircleLine />
      </div>
      <Modal open={modalOpen}>
        <OrderNew onClose={() => setModalOpen(false)} onSave={onSaveHandler} />
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
            {data.map((order, index) => {
              return (
                <tr key={index} className={styles.table_row} onClick={() => selectCustomerHandler(order)}>
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
