import moment from 'moment';
import React from 'react';

import styles from './orders.module.css';

const FutureOrdersList = ({ futureOrdersQuery, onView }) => {
  const HEADERS = ['#', 'Date', 'Name', 'Total'];

  return (
    <div className={styles.page_container}>
      <div className={styles.main_page}>
        <div className={styles.header_bar}>
          <h3 className={styles.header_bar_title}>Orders</h3>
        </div>

        {futureOrdersQuery.isLoading ? (
          <div className={styles.table_loader}>
            <img src="/images/spinner.gif" alt="loader gif" />
          </div>
        ) : (
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
                    <td className={styles.cell}>{index + 1}</td>
                    <td className={styles.cell}>{moment(order.deliveryDate).format('MMM DD, YYYY')}</td>
                    <td className={styles.cell}>{order.orderDetails.customer.name}</td>
                    <td className={styles.cell}>{order.total.toLocaleString('en-US')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FutureOrdersList;
