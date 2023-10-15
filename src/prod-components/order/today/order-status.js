'use client';
import React, { useState } from 'react';
import { RiCloseCircleLine, RiBitCoinLine } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';
import { BsCartCheck, BsCartX, BsCashCoin } from 'react-icons/bs';

import Modal from '@/assets/modal';
import styles from './order-today.module.css';

const OrderStatus = ({ order, index, onUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [delivered, setDelivered] = useState(order.isDelivered);
  const [paid, setPaid] = useState(order.isPaid);
  const [gCash, setGCash] = useState(order.isGcash);

  const onSubmitHandler = () => {
    onUpdate({ isDelivered: delivered, isPaid: paid, isGcash: gCash, _id: order._id });
    setModalOpen(false);
  };

  const getStatusColor = (data) => {
    if (data && data.isPaid && data.isDelivered && data.isGcash) return styles.blue;
    if (data && data.isPaid && data.isDelivered && !data.isGcash) return styles.green;
    if (data && !data.isPaid && data.isDelivered) return styles.red;
    if (data && data.isPaid && !data.isDelivered) return styles.purple;
    return styles.orange;
  };

  return (
    <>
      <Modal open={modalOpen}>
        <div className={styles.modal_header_bar}>
          <h2 className={styles.modal_header_text}>Update Order Status</h2>
          <div className={styles.modal_header_icon_container}>
            <div className={styles.modal_header_icon} onClick={() => setModalOpen(false)}>
              <RiCloseCircleLine />
            </div>
          </div>
        </div>
        <div className={styles.modal_body}>
          <div className={styles.status_icon_container}>
            <div
              className={`${styles.status_icon} ${delivered ? styles.status_icon_green : styles.status_icon_red}`}
              onClick={() => setDelivered(!delivered)}
            >
              <TbTruckDelivery />
              <span className={styles.status_icon_text}>{delivered ? 'Delivered' : 'Ordered'}</span>
            </div>
            <div
              className={`${styles.status_icon} ${gCash ? styles.status_icon_blue : styles.status_icon_green}`}
              onClick={() => setGCash(!gCash)}
            >
              {gCash ? <RiBitCoinLine /> : <BsCashCoin />}
              <span className={styles.status_icon_text}>{gCash ? 'G-Cash' : 'Cash'}</span>
            </div>
            <div
              className={`${styles.status_icon} ${paid ? styles.status_icon_green : styles.status_icon_red}`}
              onClick={() => setPaid(!paid)}
            >
              {paid ? <BsCartCheck /> : <BsCartX />}
              <span className={styles.status_icon_text}>{paid ? 'Paid' : 'Not Paid'}</span>
            </div>
          </div>
          <div className={styles.button_container}>
            <button type="reset" className={styles.button_cancel} onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className={styles.button_save} type="submit" onClick={onSubmitHandler}>
              Save
            </button>
          </div>
        </div>
      </Modal>
      <div className={styles.cell_order_number_container} onClick={() => setModalOpen(true)}>
        <div className={`${styles.cell_order_number} ${getStatusColor(order)}`}>{index + 1}</div>
      </div>
    </>
  );
};

export default OrderStatus;
