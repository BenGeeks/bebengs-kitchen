import React from 'react';
import moment from 'moment';

import collectiblesStyles from '@/styles/collectibles.module.css';
import tableStyles from '@/styles/assets.module.css';

const CollectibleList = ({ collectiblesQuery, selectedOrder, setSelectedOrder }) => {
  const HEADERS = ['Age', 'Date', 'Name', 'Total'];

  return (
    <div className={collectiblesStyles.page_container}>
      <div className={collectiblesStyles.main_page}>
        <div className={collectiblesStyles.header_bar}>
          <h3 className={collectiblesStyles.header_bar_title}>Collectibles</h3>
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
              {collectiblesQuery?.data?.map((order, index) => {
                return (
                  <tr
                    key={index}
                    className={tableStyles.table_row_clickable}
                    onClick={() =>
                      !selectedOrder
                        ? setSelectedOrder(order)
                        : selectedOrder._id === order._id
                        ? setSelectedOrder(null)
                        : setSelectedOrder(order)
                    }
                  >
                    <td className={collectiblesStyles.cell}>{moment().diff(order.deliveryDate, 'days')}</td>
                    <td className={collectiblesStyles.cell}>{moment(order.deliveryDate).format('MMM DD, YYYY')}</td>
                    <td className={collectiblesStyles.cell}>{order.orderDetails.customer.name}</td>
                    <td className={collectiblesStyles.cell}>{order.total.toLocaleString('en-US')}</td>
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

export default CollectibleList;
