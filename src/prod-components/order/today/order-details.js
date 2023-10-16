import React, { useState } from 'react';
import moment from 'moment';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

import Table from '@/assets/table';
import { ORDER_ITEMS_HEADER } from '@/resources/orders';
import orderStyles from '@/styles/order.module.css';

const OrderDetails = ({ order, onView }) => {
  const [show, setShow] = useState(false);

  return (
    <div className={orderStyles.cell_order_container}>
      <div className={orderStyles.cell_order_details}>
        <div className={orderStyles.cell_customer} onClick={() => onView(order)}>
          {order && order.orderDetails.customer.displayName}
        </div>
        <div className={orderStyles.cell_delivery_time}>
          {order && order.deliveryTime && moment(order.deliveryTime, 'HH:mm').format('h:mm a')}
        </div>
        <div className={orderStyles.cell_delivery_time}>₱ {order && order.downPayment}</div>
        {!show && (
          <div className={orderStyles.cell_edit_icon} onClick={() => setShow(true)}>
            <RiEyeLine />
          </div>
        )}
        {show && (
          <div className={orderStyles.cell_edit_icon} onClick={() => setShow(false)}>
            <RiEyeOffLine />
          </div>
        )}
      </div>
      <div className={`${orderStyles.hide_details} ${show && orderStyles.show}`}>
        <Table headers={ORDER_ITEMS_HEADER} data={order.orderDetails.items} enableActions={false} />
      </div>
    </div>
  );
};

export default OrderDetails;
