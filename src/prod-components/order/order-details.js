import React, { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import ReactTable from '@/assets/react-table';

import styles from './order.module.css';

const OrderDetails = ({ row }) => {
  const [show, setShow] = useState(false);

  let ITEM_HEADER = [
    { Header: 'item', accessor: 'item_name' },
    { Header: 'variation', accessor: 'variation' },
    { Header: 'qty', accessor: 'qty' },
    { Header: 'price', accessor: 'price' },
    { Header: 'total', accessor: 'sub_total' },
  ];

  return (
    <div className={styles.cell_order_container}>
      <div className={styles.cell_order_details}>
        <div className={styles.cell_customer}>{row.original.orderDetails.customer.displayName}</div>
        <div className={styles.cell_delivery_time}>{row.original.deliveryTime}</div>
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
        <ReactTable COLUMNS={ITEM_HEADER} DATA={row.original.orderDetails.items} />
      </div>
    </div>
  );
};

export default OrderDetails;
