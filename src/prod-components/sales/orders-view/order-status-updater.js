import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiCloseCircleLine, RiBitCoinLine } from 'react-icons/ri';
import { BsCartCheck, BsCartX, BsCashCoin } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import apiRequest from '@/lib/axios';

import styles from '../sales.module.css';
import ModalWide from '@/assets/modal-wide';

const OrderStatusUpdater = ({ open, close, order }) => {
  const queryClient = useQueryClient();
  const [delivered, setDelivered] = useState(order?.isDelivered);
  const [paid, setPaid] = useState(order?.isPaid);
  const [gCash, setGCash] = useState(order?.isGcash);

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
        isPaid: paid,
        isGcash: gCash,
        paymentDate: paid ? moment() : null,
      },
    });
    close();
  };

  const cancelHandler = () => {
    setDelivered(order.isDelivered);
    setPaid(order.isPaid);
    setGCash(order.isGcash);
    close();
  };

  return (
    <ModalWide open={open} close={close}>
      <div className={styles.header_bar}>
        <h2 className={styles.header_text}>Update Order Status</h2>
        <div className={styles.header_icon_container}>
          <div className={styles.header_icon} onClick={close}>
            <RiCloseCircleLine />
          </div>
        </div>
      </div>
      <div>
        {order && (
          <div className={styles.status_icon_container}>
            <div
              className={`${styles.status_icon} ${delivered ? styles.status_icon_green : styles.status_icon_red}`}
              onClick={() => setDelivered((prev) => !prev)}
            >
              <TbTruckDelivery />
              <span className={styles.status_icon_text}>{delivered ? 'Delivered' : 'Ordered'}</span>
            </div>
            <div
              className={`${styles.status_icon} ${gCash ? styles.status_icon_blue : styles.status_icon_green}`}
              onClick={() => setGCash((prev) => !prev)}
            >
              {gCash ? <RiBitCoinLine /> : <BsCashCoin />}
              <span className={styles.status_icon_text}>{gCash ? 'G-Cash' : 'Cash'}</span>
            </div>
            <div
              className={`${styles.status_icon} ${paid ? styles.status_icon_green : styles.status_icon_red}`}
              onClick={() => setPaid((prev) => !prev)}
            >
              {paid ? <BsCartCheck /> : <BsCartX />}
              <span className={styles.status_icon_text}>{paid ? 'Paid' : 'Not Paid'}</span>
            </div>
          </div>
        )}
        <div className={styles.button_container}>
          <button type="reset" className={styles.button_cancel} onClick={cancelHandler}>
            Cancel
          </button>
          <button className={styles.button_save} type="submit" onClick={statusUpdateHandler}>
            Update
          </button>
        </div>
      </div>
    </ModalWide>
  );
};

export default OrderStatusUpdater;
