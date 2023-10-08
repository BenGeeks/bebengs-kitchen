'use client';
import React, { useState } from 'react';
import moment from 'moment';
import { RiCloseCircleLine, RiEditLine } from 'react-icons/ri';

import ReactForm from '@/assets/react-form';
import { INPUT, SCHEMA } from './resources';
import styles from './order-new.module.css';

const OrderDetails = ({ orderDetails, setOrderDetails }) => {
  const [updateDetails, setUpdateDetails] = useState(false);

  const updateDetailsHandler = (data) => {
    let tempData = {
      deliveryDate: data && data.deliveryDate ? data.deliveryDate : moment().format('YYYY-MM-DD'),
      deliveryTime: data && data.deliveryTime ? data.deliveryTime : '08:00',
      downPayment: data && data.downPayment ? data.downPayment : 0,
    };
    setOrderDetails(tempData);
    setUpdateDetails(false);
  };
  return (
    <div className={styles.sub_container}>
      {updateDetails ? (
        <div className={styles.sub_body}>
          <div className={styles.sub_header_bar}>
            <h2>Update Order Details:</h2>
            <div className={styles.sub_header_icon_container}>
              <div className={styles.sub_header_icon} onClick={() => setUpdateDetails(false)}>
                <RiCloseCircleLine />
              </div>
            </div>
          </div>
          <ReactForm
            layout={INPUT}
            schema={SCHEMA}
            defaultValues={orderDetails}
            onSubmit={updateDetailsHandler}
            onCancel={() => setUpdateDetails(false)}
          />
        </div>
      ) : (
        <div className={styles.selected_data}>
          {orderDetails ? (
            <>
              <div>
                <p>Delivery Date:</p>
                <h2>{moment(orderDetails.deliveryDate).format('MMM DD, YYYY')}</h2>
              </div>
              <div>
                <p>Delivery Time:</p>
                <h2>{moment(orderDetails.deliveryTime, 'HH:mm').format('h:mm a')}</h2>
              </div>

              <div>
                <p>Down Payment:</p>
                <h2>{`₱ ${orderDetails.downPayment}.00`}</h2>
              </div>
            </>
          ) : (
            <>
              <h2>Today</h2>
              <h2>Anytime</h2>
              <h2>₱ 0.00</h2>
            </>
          )}

          <div className={styles.sub_header_icon_container}>
            <div className={styles.sub_header_icon} onClick={() => setUpdateDetails(true)}>
              <RiEditLine />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
