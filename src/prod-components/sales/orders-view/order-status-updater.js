'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseCircleLine } from 'react-icons/ri';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import DatePicker from '@/assets/date-picker';
import ModalWide from '@/assets/modal-wide';
import styles from '../sales.module.css';
import apiRequest from '@/lib/axios';

const OrderStatusUpdater = ({ open, close, order }) => {
  const queryClient = useQueryClient();
  const [delivered, setDelivered] = useState(order?.isDelivered ? order?.isDelivered : false);
  const [gCash, setGCash] = useState(order?.isGcash ? order?.isGcash : false);
  const [paid, setPaid] = useState(order?.isPaid ? order?.isPaid : false);
  const [paymentDate, setPaymentDate] = useState(order?.paymentDate ? moment(order.paymentDate) : moment());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const updateOrderMutation = useMutation({
    mutationFn: (payload) => apiRequest({ url: `orders/${payload.id}`, method: 'PUT', data: payload.data }),
    onSuccess: () => {
      toast.success('Order updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error(error.response.data.error.message);
    },
  });

  const statusUpdateHandler = () => {
    updateOrderMutation.mutate({
      id: order._id,
      data: {
        ...order,
        isDelivered: delivered,
        isGcash: gCash,
        isPaid: paid,
        paymentDate: paid ? moment(paymentDate) : null,
      },
    });
    close();
  };

  const setCalendarDateHandler = (date) => {
    setPaymentDate(date);
    setOpenDatePicker(false);
  };

  return (
    <>
      {openDatePicker ? (
        <DatePicker
          open={openDatePicker}
          close={() => setOpenDatePicker(false)}
          defaultDate={paymentDate}
          onSave={setCalendarDateHandler}
        />
      ) : (
        <ModalWide open={open} close={close}>
          <div className={styles.header_bar}>
            <h2 className={styles.header_text}>{`Update ${order?.orderDetails?.customer?.name}'s order status`}</h2>
            <div className={styles.header_icon_container}>
              <div className={styles.header_icon} onClick={close}>
                <RiCloseCircleLine />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.input_container}>
              <label htmlFor="isDelivered" className={styles.input_label}>
                Is Delivered:
              </label>
              <label className={styles.switch}>
                <input type="checkbox" checked={delivered} onChange={() => setDelivered(!delivered)} id={'isDelivered'} />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="isGcash" className={styles.input_label}>
                Is G-cash:
              </label>
              <label className={styles.switch}>
                <input type="checkbox" checked={gCash} onChange={() => setGCash(!gCash)} id={'isGcash'} />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="isPaid" className={styles.input_label}>
                Is Paid:
              </label>
              <label className={styles.switch}>
                <input type="checkbox" checked={paid} onChange={() => setPaid(!paid)} id={'isPaid'} />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
            {paid && (
              <div className={styles.input_container}>
                <label htmlFor="paymentDate" className={styles.input_label}>
                  Payment Date:
                </label>
                <div type="date" className={styles.date_status} onClick={() => setOpenDatePicker(true)} id={'paymentDate'}>
                  {moment(paymentDate).format('ll')}
                </div>
              </div>
            )}
          </div>
          <div className={styles.button_container}>
            <button type="reset" className={styles.button_cancel} onClick={close}>
              Cancel
            </button>
            <button className={styles.button_save} type="submit" onClick={statusUpdateHandler}>
              Update
            </button>
          </div>
        </ModalWide>
      )}
    </>
  );
};

export default OrderStatusUpdater;
