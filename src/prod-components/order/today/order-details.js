import React, { useState } from 'react';
import moment from 'moment';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

import ReactTable from '@/assets/react-table';
import { ITEM_HEADER } from '@/resources/orders';
import styles from './order-today.module.css';

const OrderDetails = ({ order, onView }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.cell_order_container}>
      <div className={styles.cell_order_details}>
        <div className={styles.cell_customer} onClick={() => onView(order)}>
          {order && order.orderDetails.customer.displayName}
        </div>
        {order && order.deliveryTime ? (
          <div className={styles.cell_delivery_time}>
            {order && order.deliveryTime && moment(order.deliveryTime, 'HH:mm').format('h:mm a')}
          </div>
        ) : (
          <div className={styles.cell_delivery_time}>Anytime</div>
        )}
        {order && order.downPayment !== 0 ? (
          <div className={styles.cell_delivery_time}>₱ {order && order.downPayment}</div>
        ) : (
          <div className={styles.cell_delivery_time}>₱ 0</div>
        )}
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
