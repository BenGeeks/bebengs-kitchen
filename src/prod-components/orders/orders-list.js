'use client';
import moment from 'moment';
import React from 'react';

import { Loader, Error } from '@/assets/loader-error';

import { HEADERS, getStatusColor } from './resources';
import styles from './orders.module.css';

const FutureOrdersList = ({ futureOrdersQuery, onView }) => {
  if (futureOrdersQuery.isLoading)
    return (
      <div className={styles.page_container}>
        <Loader />
      </div>
    );

  if (futureOrdersQuery.isError)
    return (
      <div className={styles.page_container}>
        <Error error={futureOrdersQuery.error} />
      </div>
    );

  return (
    <div className={styles.page_container}>
      <div className={styles.main_page}>
        <div className={styles.header_bar}>
          <h3 className={styles.header_bar_title}>Orders</h3>
        </div>
        <table className={styles.table}>
          <thead>
            <tr className={styles.table_head_row}>
              {HEADERS.map((head) => {
                return (
                  <th className={styles.table_head} key={head}>
                    <div className={styles.table_head_text}>{head}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {futureOrdersQuery?.data?.map((order, index) => {
              return (
                <tr key={index} className={styles.table_row_clickable} onClick={() => onView(order)}>
                  <td className={`${getStatusColor(order)} ${styles.cell_status}`}>{index + 1}</td>
                  <td className={styles.cell}>{moment(order.deliveryDate).format('MMM DD')}</td>
                  <td className={styles.cell}>{order.orderDetails.customer.name}</td>
                  <td className={styles.cell}>{order.total.toLocaleString('en-US')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FutureOrdersList;
