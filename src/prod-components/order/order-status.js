'use client';
import React, { useState } from 'react';
import { RiCloseCircleLine, RiBitCoinLine } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';
import { BsCartCheck, BsCartX, BsCashCoin } from 'react-icons/bs';

import Modal from '@/assets/modal';
import styles from './order.module.css';

const OrderStatus = ({ row }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [delivered, setDelivered] = useState(row.original.delivered);
  const [paid, setPaid] = useState(row.original.paid);
  const [isGcash, setIsGcash] = useState(row.original.isGcash);

  const onSubmitHandler = () => {
    console.log('ON SUBMIT HANDLER HAS BEEN CALLED!');
    setModalOpen(false);
  };

  const getStatusColor = (data) => {
    if (data.isPaid && data.delivered && data.isGcash) return styles.blue;
    if (data.isPaid && data.delivered && !data.isGcash) return styles.green;
    if (!data.isPaid && data.delivered) return styles.red;
    if (data.isPaid && !data.delivered) return styles.purple;
    return styles.orange;
  };
  console.log(row);
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
              className={`${styles.status_icon} ${isGcash ? styles.status_icon_blue : styles.status_icon_green}`}
              onClick={() => setIsGcash(!isGcash)}
            >
              {isGcash ? <RiBitCoinLine /> : <BsCashCoin />}
              <span className={styles.status_icon_text}>{isGcash ? 'G-Cash' : 'Cash'}</span>
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
        <div className={`${styles.cell_order_number} ${getStatusColor(row.original)}`}>{row.index + 1}</div>
      </div>
    </>
  );
};

export default OrderStatus;
