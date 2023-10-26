import React, { useState } from 'react';
import moment from 'moment';
import { RiEyeLine, RiEyeOffLine, RiEditLine } from 'react-icons/ri';

import Table from '@/assets/table';
import { ORDER_ITEMS_HEADER } from '@/resources/orders';
import orderStyles from '@/styles/order.module.css';
import iconStyles from '@/styles/icons.module.css';

const OrderDetails = ({ order, onEdit }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={orderStyles.cell_order_details}>
        <div className={orderStyles.cell_customer}>{`
        ${order?.orderDetails?.customer?.name} - 
        ${order?.orderDetails?.customer?.address} 
        B${order?.orderDetails?.customer?.block}
        L${order?.orderDetails?.customer?.lot}
        `}</div>
        {order.deliveryTime !== '00:00' && (
          <div className={orderStyles.cell_delivery_time}>
            {order && order.deliveryTime && moment(order.deliveryTime, 'HH:mm').format('h:mm a')}
          </div>
        )}
        {order.downPayment !== 0 && <div className={orderStyles.cell_delivery_time}>₱ {order && order.downPayment}</div>}

        <div className={iconStyles.icons_container}>
          <div className={iconStyles.small_icon} onClick={() => onEdit(order)}>
            <RiEditLine />
          </div>
          {!show && (
            <div className={iconStyles.small_icon} onClick={() => setShow(true)}>
              <RiEyeLine />
            </div>
          )}
          {show && (
            <div className={iconStyles.small_icon} onClick={() => setShow(false)}>
              <RiEyeOffLine />
            </div>
          )}
        </div>
      </div>
      <div className={`${orderStyles.hide_details} ${show && orderStyles.show}`}>
        <Table headers={ORDER_ITEMS_HEADER} data={order.orderDetails.items} enableActions={false} />
      </div>
    </>
  );
};

export default OrderDetails;
