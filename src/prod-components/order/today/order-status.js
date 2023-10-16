'use client';
import React, { useState } from 'react';
import { RiCloseCircleLine, RiBitCoinLine } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';
import { BsCartCheck, BsCartX, BsCashCoin } from 'react-icons/bs';

import Modal from '@/assets/modal';
import orderStyles from '@/styles/order.module.css';
import modalStyles from '@/styles/modal.module.css';

const OrderStatus = ({ order, index, onUpdate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [delivered, setDelivered] = useState(order.isDelivered);
  const [paid, setPaid] = useState(order.isPaid);
  const [gCash, setGCash] = useState(order.isGcash);

  const onSubmitHandler = () => {
    onUpdate({ isDelivered: delivered, isPaid: paid, isGcash: gCash, _id: order._id });
    setModalOpen(false);
  };

  const cancelHandler = () => {
    setDelivered(order.isDelivered);
    setPaid(order.isPaid);
    setGCash(order.isGcash);
    setModalOpen(false);
  };
  const getStatusColor = (data) => {
    if (data && data.isPaid && data.isDelivered && data.isGcash) return orderStyles.blue;
    if (data && data.isPaid && data.isDelivered && !data.isGcash) return orderStyles.green;
    if (data && !data.isPaid && data.isDelivered) return orderStyles.red;
    if (data && data.isPaid && !data.isDelivered) return orderStyles.purple;
    return orderStyles.orange;
  };

  return (
    <>
      <Modal open={modalOpen}>
        <div className={modalStyles.modal_header_bar}>
          <h2 className={modalStyles.modal_header_text}>Update Order Status</h2>
          <div className={modalStyles.modal_header_icon_container}>
            <div className={modalStyles.modal_header_icon} onClick={() => setModalOpen(false)}>
              <RiCloseCircleLine />
            </div>
          </div>
        </div>
        <div className={modalStyles.modal_body}>
          <div className={orderStyles.status_icon_container}>
            <div
              className={`${orderStyles.status_icon} ${delivered ? orderStyles.status_icon_green : orderStyles.status_icon_red}`}
              onClick={() => setDelivered(!delivered)}
            >
              <TbTruckDelivery />
              <span className={orderStyles.status_icon_text}>{delivered ? 'Delivered' : 'Ordered'}</span>
            </div>
            <div
              className={`${orderStyles.status_icon} ${gCash ? orderStyles.status_icon_blue : orderStyles.status_icon_green}`}
              onClick={() => setGCash(!gCash)}
            >
              {gCash ? <RiBitCoinLine /> : <BsCashCoin />}
              <span className={orderStyles.status_icon_text}>{gCash ? 'G-Cash' : 'Cash'}</span>
            </div>
            <div
              className={`${orderStyles.status_icon} ${paid ? orderStyles.status_icon_green : orderStyles.status_icon_red}`}
              onClick={() => setPaid(!paid)}
            >
              {paid ? <BsCartCheck /> : <BsCartX />}
              <span className={orderStyles.status_icon_text}>{paid ? 'Paid' : 'Not Paid'}</span>
            </div>
          </div>
          <div className={orderStyles.button_container}>
            <button type="reset" className={orderStyles.button_cancel} onClick={cancelHandler}>
              Cancel
            </button>
            <button className={orderStyles.button_save} type="submit" onClick={onSubmitHandler}>
              Save
            </button>
          </div>
        </div>
      </Modal>
      <div className={orderStyles.cell_order_number_container} onClick={() => setModalOpen(true)}>
        <div className={`${orderStyles.cell_order_number} ${getStatusColor(order)}`}>{index + 1}</div>
      </div>
    </>
  );
};

export default OrderStatus;
