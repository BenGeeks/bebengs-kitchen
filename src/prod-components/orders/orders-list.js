import moment from 'moment';
import React from 'react';

import futureOrdersStyles from '@/styles/future-orders.module.css';
import tableStyles from '@/styles/assets.module.css';

const FutureOrdersList = ({ futureOrdersQuery, onView }) => {
  const HEADERS = ['#', 'Date', 'Name', 'Total'];

  return (
    <div className={futureOrdersStyles.page_container}>
      <div className={futureOrdersStyles.main_page}>
        <div className={futureOrdersStyles.header_bar}>
          <h3 className={futureOrdersStyles.header_bar_title}>Orders</h3>
        </div>
        <div className={tableStyles.table_container}>
          <table className={tableStyles.table}>
            <thead>
              <tr className={tableStyles.table_head_row}>
                {HEADERS.map((head) => {
                  return (
                    <th className={tableStyles.table_head} key={head}>
                      <div className={tableStyles.table_head_text}>{head}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {futureOrdersQuery?.data?.map((order, index) => {
                return (
                  <tr key={index} className={tableStyles.table_row_clickable} onClick={() => onView(order)}>
                    <td className={futureOrdersStyles.cell}>{index + 1}</td>
                    <td className={futureOrdersStyles.cell}>{moment(order.deliveryDate).format('MMM DD, YYYY')}</td>
                    <td className={futureOrdersStyles.cell}>{order.orderDetails.customer.name}</td>
                    <td className={futureOrdersStyles.cell}>{order.total.toLocaleString('en-US')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FutureOrdersList;
