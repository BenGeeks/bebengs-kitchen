import React, { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import ReactTable from '@/assets/react-table';

import styles from './order-today.module.css';

const OrderDetails = ({ order, onView }) => {
  const [show, setShow] = useState(false);

  console.log('ORDER: ', order);

  let ITEM_HEADER = [
    { Header: 'item', accessor: 'item_name' },
    { Header: 'size', accessor: 'size' },
    { Header: 'qty', accessor: 'qty' },
    { Header: 'price', accessor: 'price' },
    { Header: 'total', accessor: 'sub_total' },
  ];

  return (
    <div className={styles.cell_order_container}>
      <div className={styles.cell_order_details}>
        <div className={styles.cell_customer}>{order && order.orderDetails.customer.displayName}</div>
        <div className={styles.cell_delivery_time}>{order && order.deliveryTime}</div>
        <div className={styles.cell_delivery_time}>₱ {order && order.downPayment}.00</div>
        {!show && (
          <div className={styles.cell_edit_icon} onClick={() => setShow(true)}>
            <RiEyeLine />
          </div>
        )}
        {show && (
          <div className={styles.cell_edit_icon} onClick={() => setShow(false)}>
            <RiEyeOffLine />
          </div>
        )}
      </div>
      <div className={`${styles.hide_details} ${show && styles.show}`}>
        {order && <ReactTable COLUMNS={ITEM_HEADER} DATA={order.orderDetails.items} />}
      </div>
    </div>
  );
};

export default OrderDetails;
