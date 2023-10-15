'use client';
import React, { useState } from 'react';
import moment from 'moment';
import { RiCloseCircleLine, RiEditLine } from 'react-icons/ri';

import ReactForm from '@/assets/react-form';
import { ORDER_DETAILS_INPUT, ORDER_DETAILS_SCHEMA } from '@/resources/menu';
import pageStyles from '@/styles/page.module.css';

const OrderDetails = ({ orderDetails, setOrderDetails, onEdit, edited }) => {
  const [updateDetails, setUpdateDetails] = useState(false);

  const updateDetailsHandler = (data) => {
    let tempData = {
      deliveryDate: data && data.deliveryDate ? data.deliveryDate : moment().format('YYYY-MM-DD'),
      deliveryTime: data && data.deliveryTime ? data.deliveryTime : null,
      downPayment: data && data.downPayment ? data.downPayment : 0,
    };
    setOrderDetails(tempData);
    setUpdateDetails(false);
    edited(true);
    onEdit(null);
  };

  return (
    <div className={pageStyles.sub_container}>
      {updateDetails ? (
        <div className={pageStyles.sub_body}>
          <div className={pageStyles.sub_header_bar}>
            <h2>Update Order Details:</h2>
            <div className={pageStyles.sub_header_icon_container}>
              <div
                className={pageStyles.sub_header_icon}
                onClick={() => {
                  setUpdateDetails(false);
                  onEdit(null);
                }}
              >
                <RiCloseCircleLine />
              </div>
            </div>
          </div>
          <ReactForm
            layout={ORDER_DETAILS_INPUT}
            schema={ORDER_DETAILS_SCHEMA}
            defaultValues={{
              ...orderDetails,
              deliveryDate: moment(orderDetails.deliveryDate).format('yyyy-MM-DD'),
            }}
            onSubmit={updateDetailsHandler}
            onCancel={() => {
              setUpdateDetails(false);
              onEdit(null);
            }}
          />
        </div>
      ) : (
        <div className={pageStyles.selected_data}>
          {orderDetails ? (
            <>
              <div>
                <p>Delivery Date:</p>
                <h2>{moment(orderDetails.deliveryDate).format('MMM DD')}</h2>
              </div>
              <div>
                <p>Delivery Time:</p>
                <h2>{orderDetails.deliveryTime === null ? 'Anytime' : moment(orderDetails.deliveryTime, 'HH:mm').format('h:mm a')}</h2>
              </div>
              <div>
                <p>Down Payment:</p>
                <h2>{`₱ ${orderDetails.downPayment}.00`}</h2>
              </div>
              <div>
                <p>Date Paid:</p>
                <h2>{orderDetails.datePaid ? moment(orderDetails.datePaid).format('MMM DD, YYYY') : 'n/a'}</h2>
              </div>
            </>
          ) : (
            <>
              <h2>Today</h2>
              <h2>Anytime</h2>
              <h2>₱ 0.00</h2>
            </>
          )}

          <div className={pageStyles.sub_header_icon_container}>
            <div
              className={pageStyles.sub_header_icon}
              onClick={() => {
                setUpdateDetails(true);
                onEdit('details');
              }}
            >
              <RiEditLine />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
